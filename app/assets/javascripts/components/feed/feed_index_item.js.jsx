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
            <div className="row index-item-details">
              <div className="col-md-1">
                <button type="button"
                        className="btn btn-primary btn-circle btn-play btn-xl"
                        onClick={this._playNow}>
                  <i className="btn-text glyphicon glyphicon-play"></i>
                </button>
              </div>
              <div className="col-md-11">
                <div className="row">
                    <span className="index-item-left-detail">{song.artist_username}</span>
                    <span className="index-item-right-detail">{timeSince}</span>
                </div>
                <div className="row">
                    <span className="index-item-left-detail">{song.title}</span>
                    <div className="index-item-right-detail">
                      <span >tags</span>
                    </div>
                </div>
              </div>
            </div>

            <div className="row song-index-sound">
            </div>

            <div className="container">
              <div className="song-index-buttons">
                <button type="button"
                        className="btn btn-primary btn-xs btn-song-index"
                        onClick={this._queueSong}>
                  <i className="glyphicon glyphicon-plus"></i>
                  Add to Queue
                </button>


                <button type="button"
                        className="btn btn-primary btn-xs btn-song-index"
                        onClick={this._playNext}>
                  <i className="btn-song-index glyphicon glyphicon-arrow-right"></i>
                  Play Next
                </button>

                <button type="button"
                        className="btn btn-primary btn-xs btn-song-index">
                  <i className="btn-song-index glyphicon glyphicon-heart"></i>
                  Like
                </button>

                <button type="button"
                        className="btn btn-primary btn-xs btn-song-index">
                  <i className="btn-song-index glyphicon glyphicon-retweet"></i>
                  Repost
                </button>
              </div>
            </div>
          </div>
        </div>

      );
    }
  });
}(this));
