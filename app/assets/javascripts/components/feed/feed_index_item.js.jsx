(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({
    render: function () {
      var song = this.props.song;
      return (
        <div>
          <img src={song.image_url}
               height="60px"
               width="60px"/>
          <span>{song.title}</span>
          <div>
            <audio src={song.content_url}/>
          </div>
        </div>
      );
    }
  });
}(this));
