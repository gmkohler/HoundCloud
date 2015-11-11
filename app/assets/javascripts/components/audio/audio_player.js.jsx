/* global React */
(function(root) {
  'use strict';

  root.AudioPlayer = React.createClass({
    getInitialState: function () {
      return {paused: true,
              currentSong: {id: null},
              queue: [],
              currentTime: 0,
              duration: 0,
            };
    },

    componentDidMount: function () {
      SongStore.addQueueChangeListener(this._onQueueChange);
      AudioStore.addChangeListener(this._onAudioChange);
    },

    componentWillUnmount: function () {
      SongStore.removeQueueChangeListener(this._onQueueChange);
      AudioStore.removeChangeListener(this._onAudioChange);
    },

    componentDidUpdate: function (_, prevState) {
      // currently doesn't allow for two songs in the same queue.
      // May ask queue to have a counter that always increments.
      var isNewSong = this.state.currentSong.id !== prevState.currentSong.id;
      if (isNewSong) {
        setTimeout(function(){
          AudioActions.receiveNewTrack(this.state.currentSong);
        }.bind(this), 0);
      }
    },

    _onAudioChange: function () {
      var params = AudioStore.getParams();
      this.setState({
        paused: params.paused,
        currentTime: params.currentTime,
        duration: params.duration
      });
    },

    _onQueueChange: function () {
      var queue = SongStore.getQueue(),
          currentSong = queue.splice(0, 1)[0] || {content_url: ""};
      this.setState({currentSong: currentSong, queue: queue});
    },

    _togglePlay: function () {
      AudioActions.togglePlay();
    },
    _onPrev: function (e) {
      // see AudioPlayer for further notes.
      e.preventDefault();
      AudioActions.resetSong();
    },

    _percentElapsed: function () {
      if (this.state.duration === 0) {
        return 0;
      } else {
        return (this.state.currentTime/this.state.duration) * 100;
      }
    },

    _onNext: function (e) {
      e.preventDefault();
      SongApiActions.shiftQueueForward();
    },

    _actionIcon: function () {
      if (this.state.paused) {
        return "glyphicon glyphicon-play";
      } else {
        return "glyphicon glyphicon-pause";
      }
    },

    render: function () {
      var buttons = (
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
                     onClick={this._togglePlay}>
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
           </a>]
       );

       var percentElapsed = this._percentElapsed(),
           percentRemaining = 100 - percentElapsed;

      var timeElapsedStyle = {
        display: "inline-block",
        float: "left",
        backgroundColor: "#FF5500",
        height:"3px",
        width: "" + percentElapsed + "%"
      }
      var timeRemainingStyle = {
        display:"inline-block",
        float:"left",
        backgroundColor: "#AAAAAA",
        height:"3px",
        width: "" + percentRemaining + "%"
      }

      // Need to add in Queue again...
      return (
        <nav id="audio-player" className="nav navbar-default navbar-fixed-bottom">
          <div className="container">
            <div id="audio-player-controls"
                 className="now-playing-buttons">
                 <div className="clearfix">
                   {buttons}
                 </div>
            </div>
            <div id="now-playing-state">
              <NowPlaying />
              <div className="time left">
                {this.state.currentTime.toString().toHHMMSS()}
              </div>
              <div className="progress-bar clearfix">
                <div style={timeElapsedStyle}></div>
                <div style={timeRemainingStyle}></div>
              </div>
              <div className="time right">
                {this.state.duration.toString().toHHMMSS()}
              </div>
            </div>

            <div  className="nav navbar-nav navbar-left">
              <QueueIndex queue={this.state.queue}/>
            </div>

              <div id="audio-player-song-holder">
                <NowPlayingBadge song={this.state.currentSong} />
              </div>
          </div>
        </nav>
      );
    }
  });

}(this));
