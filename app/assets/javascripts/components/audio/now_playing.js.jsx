(function(root) {
  'use strict';
  root.NowPlaying = React.createClass({

    componentDidMount: function () {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },

    componentWillReceiveProps: function () {
      // Want to do an "auto play" here if there is no audio.
    },

    componentDidUpdate: function () {
      this._findAudio();
    },

    _findAudio: function () {
      debugger;
      this.audio = document.getElementById('audio');
      this.audio.crossOrigin = "anonymous";
      this.src = this.ctx.createMediaElementSource(this.audio);
    },

    _connectSourceNode: function (){
    },

    _playToggle: function () {
      debugger;
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },

    render: function () {
      var audio,
          song = this.props.song,
          buttons = (
            [<button type="button" className="btn btn-primary btn-default">
               <i className="glyphicon glyphicon-step-backward"></i>
             </button>,
             <button type="button"
                     className="btn btn-primary btn-default"
                     onClick={this._playToggle}>
               <i className="glyphicon glyphicon-play"></i>
             </button>,
             <button type="button" className="btn btn-primary btn-default">
               <i className="glyphicon glyphicon-step-forward"></i>
             </button>]
      );

      if (song) {
        audio = <audio id="audio" src={song.content_url}></audio>;
      }

      return (
        <div>
          {buttons}
          <span>{song.title}</span>
          {audio}
        </div>
      );
    }
  });
}(this));
