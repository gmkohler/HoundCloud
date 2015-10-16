/* global React */
/* global AudioSource */
(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({

    componentDidMount: function () {
      // debugger;
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.audio = document.getElementById('audio');
      this.audio.crossOrigin = "anonymous";
    },

    _playNode: function () {
      var src = this.ctx.createMediaElementSource(this.audio);
      src.connect(this.ctx.destination);
      this.audio.play();
    },

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
                  className="btn btn-primary btn-circle btn-xl"
                  onClick={this._playNode}>
            <i className="glyphicon glyphicon-play"></i>
          </button>
          <span>{song.title}</span>
          <audio src={song.content_url} id="audio"></audio>

        </div>
      );
    }
  });
}(this));
