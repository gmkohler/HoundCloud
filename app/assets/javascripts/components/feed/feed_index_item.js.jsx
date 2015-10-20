/* global React */
/* global AudioSource */
(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({

    componentDidMount: function () {},

    _queueSong: function () {
      SongApiActions.receiveQueuedSong(this.props.song.id);
    },

    _playNext: function () {
      SongApiActions.receivePlayNext(this.props.song.id);
    },

    _playNow: function () {
      SongApiActions.receivePlayNow(this.props.song.id);
    },

    render: function () {
      var song = this.props.song;
      var tags = song.tags.map(function(tag){
        return (
          <div className="index-item-tag">
            <span className="index-item-tag-text">{"# " + tag.name}</span>
          </div>
        );
      });
      var timeSince = AppUtil.timeSince(new Date(song.created_at));
      var thumbStyle = {
        backgroundImage: "url(" + song.image_url + ")",
        backgroundPosition: "center",
        height: "120px",
        width: "120px"
      };
      return (
        <div className="row index-item">
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
                              className="btn btn-primary btn-circle btn-play btn-xl"
                              onClick={this._playNow}>
                        <i className="btn-text glyphicon glyphicon-play"></i>
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

            <div className="song-index-sound">
            </div>


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
                        className="btn btn-xs btn-song-index">
                  <i className="glyphicon glyphicon-heart"></i>
                  Like
                </button>

                <button type="button"
                        className="btn btn-xs btn-song-index">
                  <i className="glyphicon glyphicon-retweet"></i>
                  Repost
                </button>
              </div>

          </div>
        </div>

      );
    }
  });
}(this));
