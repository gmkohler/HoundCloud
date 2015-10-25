(function(root) {
  'use strict';
  root.QueueIndexItem = React.createClass({

    _removeFromQueue: function (e) {
      e.preventDefault();
      SongApiActions.removeSongFromQueue(this.props.idx);
    },

    _moveForward: function (e) {
      e.preventDefault();
      debugger;
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

    render: function () {
      var song = this.props.song;

      var thumbnailStyle = {
        backgroundImage: "url(" + (song.image_url || "") + ")",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "30px",
        width: "30px",
        border: "1px solid rgba(0, 0, 0, .15)",
        position: "relative",
        top: "7px"
      };

      return (
        <div>
          <div className="now-playing-badge-thumbnail-container">
            <div className="now-playing-badge-thumbnail"
                  style={thumbnailStyle}/>
          </div>
          <div className="now-playing-badge-info">
            <div>
              <span className="now-playing-badge-boilerplate">{song.artist_username}</span>
            </div>
            <div>
              <span className="now-playing-badge">{song.title || "Nothing selected"}</span>
            </div>
          </div>
          <div className="queue-index-item-button-container">
            <div id="queue-index-item-move-back">
              <i className="glyphicon glyphicon-arrow-up"
                 onClick={this._moveBackward}/>
            </div>
            <div id="queue-index-item-move-up">
              <i className="glyphicon glyphicon-arrow-down"
                 onClick={this._moveForward}/>
            </div>
            <div id="queue-index-item-remove">
              <i className="glyphicon glyphicon-remove"
                 onClick={this._removeFromQueue}/>
            </div>
          </div>
        </div>
      );

    }
  });
}(this));
