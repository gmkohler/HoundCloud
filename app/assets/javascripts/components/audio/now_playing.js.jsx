(function(root) {
  'use strict';
  root.NowPlaying = React.createClass({
    getInitialState: function () {
      return {paused: true};
    },

    componentDidMount: function () {
      this.audio = new Audio();
      this.audio.addEventListener("ended", this._onNext, false);
      // "timeupdate" is another important change.
    },

    // Let's solve this from the top:
    // 1) Getting auto-play to work.
    //   When we get a new song we need to change this.audio's source
    //     - However, we don't want to do this if we are receiving this new prop
    //         and the newProp song is the song that is changing.
    //   When the end of the queue is reached, set state to paused.
    componentWillReceiveProps: function (newProps) {
      var song = newProps.song;

      if (song.content_url === "") {
        this.setState({paused: true});
      } else if (song.content_url !== this.audio.src) {
          this.audio.setAttribute('src', song.content_url);
          this.audio.load();
          if (this.props.song.content_url === "") {
            this._playToggle();
          } else if (!this.state.paused) {
            this.audio.play();
          }
      }
    },

    _onPrev: function (e) {
      // see AudioPlayer for further notes.
      e.preventDefault();
      this.audio.currentTime = 0;
    },

    _onNext: function (e) {
      e.preventDefault();
      SongApiActions.shiftQueueForward();
    },

    _playToggle: function () {
      if (!this.audio.src) {return;}
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.setState({paused: !this.state.paused});
    },

    _actionIcon: function () {
      if (this.state.paused) {
        return "glyphicon glyphicon-play";
      } else {
        return "glyphicon glyphicon-pause";
      }
    },

    render: function () {
      var song = this.props.song,
          buttons = (
              [<a href="javascript:void(0)">
                 <button key="back"
                         type="button"
                         className="btn btn-xl playback-btn skip"
                         onClick={this._onPrev}>
                   <i className="glyphicon glyphicon-step-backward"></i>
                 </button>
               </a>,
               <a href="javascript:void(0)">
                 <button key="play"
                         type="button"
                         className="btn btn-xl playback-btn play"
                         onClick={this._playToggle}>
                   <i className={this._actionIcon()}></i>
                 </button>
               </a>,
               <a href="javascript:void(0)">
                 <button type="button"
                         key="next"
                         className="btn btn-xl playback-btn skip"
                         onClick={this._onNext}>
                   <i className="glyphicon glyphicon-step-forward"></i>
                 </button>
               </a>,
               <a href="javascript:void(0)">
                 <button type="button"
                         key="repeat"
                         className="btn btn-xl playback-btn repeat">
                   <i className="glyphicon glyphicon-repeat"></i>
                 </button>
               </a>]
      );

      return (
        <div id="audio-player-controls"
             className="now-playing-buttons">
          {buttons}
        </div>
      );
    }
  });
}(this));
