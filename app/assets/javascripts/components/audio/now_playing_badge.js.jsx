(function(root) {
  'use strict';
  root.NowPlayingBadge = React.createClass({
    render: function () {
      var song = this.props.song;

      var thumbnailStyle = {
        backgroundImage: "url(" + song.image_url + ")",
        backgroundSize: "contain",
        backgroundPosition: "center"        
      };

      return (
        <div className="now-playing-badge">
          <span className="now-playing-badge-thumbnail"
                style={thumbnailStyle}></span>
          <span className="now-playing-badge-boilerplate">Now playing:</span>
          <span className="now-playing-badge">{song.title}</span>
        </div>
      );
    }
  });
}(this));
