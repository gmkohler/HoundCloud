/* global React */
/* global AudioSource */
(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({
    getInitialState: function () {
      return {isPlaying: false, paused: true, currentTime: 0, duration: 0};
    },

    componentDidMount: function () {
      SongStore.addQueueChangeListener(this._onQueueChange);
    },

    componentWillUnmount: function () {
      SongStore.removeQueueChangeListener(this._onQueueChange);
    },

    _onQueueChange: function () {
      if (SongStore.getCurrentSongID() === this.props.song.id) {
        if (!this.state.isPlaying) {
          this.setState({isPlaying: true});
          AudioStore.addChangeListener(this._getParamsFromStore);
        }
      } else if (this.state.isPlaying) {
        this.setState({isPlaying: false, currentTime: 0, paused: true});
        AudioStore.removeChangeListener(this._getParamsFromStore);
      }
    },

    _getParamsFromStore: function () {
      var params = AudioStore.getParams();
      this.setState({
        paused: params.paused,
        currentTime: params.currentTime,
        duration: params.duration
      });
    },

    _percentElapsed: function () {
      return (this.state.currentTime / this.state.duration) || 0;
    },

    _queueSong: function (e) {
      e.preventDefault();
      SongApiActions.receiveQueuedSong(this.props.song.id);
    },

    _playNext: function (e) {
      e.preventDefault();
      SongApiActions.receivePlayNext(this.props.song.id);
    },

    _playToggle: function (e) {
      e.preventDefault();
      if (this.state.isPlaying) {
        AudioActions.togglePlay();
      } else {
        SongApiActions.receivePlayNow(this.props.song.id);
      }
    },

    _editSong: function () {
      ModalActions.activateSongFormModal(this.props.song);
    },

    _addComment: function (body) {
      var commentTime = this._percentElapsed();
      CommentsApiUtil.addSongComment(this.props.song.id, body, commentTime);
    },

    _likeToggle: function (e) {
      e.preventDefault();
      var song = this.props.song;
      if (song.isLiked) {
        LikeApiUtil.removeSongLike(song.id);
      } else {
        LikeApiUtil.addSongLike(song.id);
      }
    },

    _repostToggle: function(e) {
      e.preventDefault();
      var song = this.props.song;
      if (song.isReposted) {
        RepostApiUtil.removeSongRepost(song.id);
      } else {
        RepostApiUtil.addSongRepost(song.id);
      }
    },

    render: function () {
      var song = this.props.song;
      var likeText = this.props.song.isLiked ? "Unlike" : "Like";
      var likeClass = this.props.song.isLiked ? " active" : "";
      var repostText = this.props.song.isReposted ? "Reposted" : "Repost";
      var repostClass = this.props.song.isReposted ? " active" : "";
      var playButtonClass = this.state.paused ? "glyphicon-play" : "glyphicon-pause";
      var timeSince = AppUtil.timeSince(new Date(song.created_at));

      var tags = song.tags.map(function(tag){
        return (
          <div className="index-item-tag">
            <span className="index-item-tag-text">{"# " + tag.name}</span>
          </div>
        );
      }).slice(0, 3);

      var thumbStyle = {
        backgroundImage: "url(" + song.image_url + ")",
        backgroundPosition: "center",
        height: "120px",
        width: "120px"
      };

      var editButton = (
        <button type="button"
                className="btn btn-xs btn-song-index"
                onClick={this._editSong}>
          <i className="glyphicon glyphicon-pencil"></i>
          Edit Song
        </button>
      );

     var percentElapsed = this._percentElapsed(),
         percentRemaining = 100 - percentElapsed;

     var timeElapsedStyle = {
       display: "inline-block",
       float: "left",
       backgroundColor: "#FF5500",
       height:"5px",
       width: "" + percentElapsed + "%"
     }
     var timeRemainingStyle = {
       display:"inline-block",
       float:"left",
       backgroundColor: "#777777",
       height:"5px",
       width: "" + percentRemaining + "%"
     }
      return (
        <div className="index-item clearfix">
          <div className="col-md-3" style={thumbStyle}>
          </div>

          <div className="col-md-9">
            <div className="index-item-details">
              <div className="index-item-detail-text">
                <div className="index-item-detail-row clearfix">
                    <div className="index-item-left-detail">
                      <span className="index-artist">
                        <Link to={"users/" + song.artist_id}>
                          {song.artist_username}
                        </Link>
                      </span>
                    </div>
                    <div className="index-item-right-detail">
                      <span className="index-date">{timeSince}</span>
                    </div>
                </div>
                <div className="index-item-detail-row clearfix">
                    <div className="index-item-btn-play">
                      <button type="button"
                              className="btn btn-circle btn-play btn-xl"
                              onClick={this._playToggle}>
                        <i className={"btn-text glyphicon " + playButtonClass}></i>
                      </button>
                    </div>
                    <div className="index-item-left-detail"><span className="index-title">{song.title}</span></div>
                    <div className="index-item-right-detail">
                      <div className="index-item-tag-collection clearfix">
                        {tags}
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="clearfix song-index-sound">  
              <div className="time left">
                {this.state.isPlaying ? <span>{this.state.currentTime.toString().toHHMMSS}</span> : null}
              </div>
              <div className="progress-bar clearfix">
                <div style={timeElapsedStyle}></div>
                <div style={timeRemainingStyle}></div>
              </div>
              <div className="time right">
                {this.state.isPlaying ? <span>{this.state.duration.toString().toHHMMSS}</span> : null}
              </div>
            </div>

            <CommentForm addComment={this._addComment}/>


              <div className="song-index-buttons">
                <button type="button"
                        className="btn btn-xs btn-song-index"
                        onClick={this._queueSong}>
                  <i className="glyphicon glyphicon-plus"></i>
                  Add to Queue
                </button>


                <button type="button"
                        className="btn btn-xs btn-song-index"
                        onClick={this._playNext}>
                  <i className="glyphicon glyphicon-arrow-right"></i>
                  Play Next
                </button>

                <button type="button"
                        className={"btn btn-xs btn-song-index" + likeClass}
                        onClick={this._likeToggle}>
                  <i className="glyphicon glyphicon-heart"></i>
                  {likeText}
                </button>

                <button type="button"
                        className={"btn btn-xs btn-song-index" + repostClass}
                        onClick={this._repostToggle}>
                  <i className="glyphicon glyphicon-retweet"></i>
                  {repostText}
                </button>

                {song.artist_id === CURRENT_USER_ID ? editButton : null}
              </div>

          </div>
        </div>

      );
    }
  });
}(this));
