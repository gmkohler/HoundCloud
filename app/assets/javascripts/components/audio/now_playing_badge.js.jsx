(function(root) {
  'use strict';
  root.NowPlayingBadge = React.createClass({
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

          // <div id="now-playing-badge-heart">
          //   <i className="glyphicon glyphicon-heart"/>
          // </div>
      return (
        <div className="queue-index-item">
          <div className="now-playing-badge-thumbnail"
                style={thumbnailStyle}>
          </div>
          <div className="now-playing-badge-info">
            <div>
              <span className="now-playing-badge-boilerplate">Now playing:</span>
            </div>
            <div>
              <span className="now-playing-badge-title">{song.title || "Nothing selected"}</span>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
