/* global React */
/* global AudioSource */
(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({
    render: function () {
      var song = this.props.song;
      // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // var Audio = <AudioSource song={song}/>;
      // var source = audioCtx.createMediaElementSource(Audio);
      return (
        <div>
          <img src={song.image_url}
               height="60px"
               width="60px"/>
          <button type="button"
                  className="btn btn-primary btn-circle btn-xl">
            <i className="glyphicon glyphicon-play"></i>
          </button>
          <span>{song.title}</span>
        </div>
      );
    }
  });
}(this));
