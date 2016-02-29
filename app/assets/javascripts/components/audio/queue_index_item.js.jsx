(function(root) {
  'use strict';
  root.QueueIndexItem = React.createClass({

    _removeFromQueue: function (e) {
      e.preventDefault();
      SongApiActions.removeSongFromQueue(this.props.idx);
    },

    _moveForward: function (e) {
      e.preventDefault();
      if (!this.props.first) {
        SongApiActions.moveQueuedSongForward(this.props.idx);
      }
    },

    _moveBackward: function (e) {
      e.preventDefault();
      if (!this.props.last) {
        SongApiActions.moveQueuedSongBackward(this.props.idx);
      }
    },

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
      var buttons,
          song = this.props.song;
      if (this.props.context && (this.props.context === "search" || this.props.context === "sideBar")) {
        buttons = [
          <div id="queue-index-item-play-now">
            <i className="glyphicon glyphicon-play"
               onClick={this._playNow}/>
          </div>,
          <div id="queue-index-item-play-next">
            <i className="glyphicon glyphicon-arrow-right"
               onClick={this._playNext}/>
          </div>,
          <div id="queue-index-item-queue-song">
            <i className="glyphicon glyphicon-plus"
               onClick={this._queueSong}/>
          </div>
        ];
      } else {
        buttons = [
          <div id="updown">
            <div id="queue-index-item-move-back">
              <i className="glyphicon glyphicon-arrow-up"
                 onClick={this._moveBackward}/>
            </div>
            <div id="queue-index-item-move-up">
              <i className="glyphicon glyphicon-arrow-down"
                 onClick={this._moveForward}/>
            </div>
          </div>,
          <div id="queue-index-item-remove">
            <i className="glyphicon glyphicon-remove"
               onClick={this._removeFromQueue}/>
          </div>
        ];
      }
      var thumbnailStyle = {
        backgroundImage: "url(" + (song.image_url || "") + ")",
        height: "30px",
        width: "30px"
      };

      return (
        <div className="clearfix queue-index-item sidebar">
          <div className="queue-index-item-thumbnail-container">
            <div className="queue-index-item-thumbnail"
                  style={thumbnailStyle}/>
          </div>
          <div className="queue-index-item-info">
            <div className="first-row">
              <span className="queue-index-item-artist">
                <Link to={"users/" + song.artist_id}
                      onClick={this.props.context === "search" ? this.props.clearQuery : function () {}}>
                      {song.artist_username}
                </Link>
              </span>
            </div>
            <div className="second-row">
              <span className="queue-index-item-title">
                {song.title || "Nothing selected"}
              </span>
            </div>
          </div>
          <div className="queue-index-item-button-container">
            {buttons}
          </div>
        </div>
      );

    }
  });
}(this));
