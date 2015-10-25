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
        height: "30px",
        width: "30px"
      };

      return (
        <div className="clearfix queue-index-item">
          <div className="queue-index-item-thumbnail-container">
            <div className="queue-index-item-thumbnail"
                  style={thumbnailStyle}/>
          </div>
          <div className="queue-index-item-info">
            <div className="first-row">
              <span className="queue-index-item-artist">
                <Link to={"users/" + song.artist_id}>
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
            <div id="updown">
              <div id="queue-index-item-move-back">
                <i className="glyphicon glyphicon-arrow-up"
                   onClick={this._moveBackward}/>
              </div>
              <div id="queue-index-item-move-up">
                <i className="glyphicon glyphicon-arrow-down"
                   onClick={this._moveForward}/>
              </div>
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
