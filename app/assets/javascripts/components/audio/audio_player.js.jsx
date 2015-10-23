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

    componentWillUpdate: function (_, newState) {
      if (this.state.currentSong.id !== newState.currentSong.id) {
        AudioActions.receiveNewTrack(newState.currentSong);
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

    _onNext: function (e) {
      e.preventDefault();
      var nextTrack = this.state.queue[0];
      AudioActions.receiveNewTrack({src: nextTrack.content_url});
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
           </a>,
           <a href="javascript:void(0)">
             <button type="button"
                     key="repeat"
                     className="btn btn-xl playback-btn repeat">
               <i className="glyphicon glyphicon-repeat"></i>
             </button>
           </a>]
       );

      // Need to add in Queue again...
      return (
        <nav id="audio-player" className="nav navbar-default navbar-fixed-bottom">
          <div className="container">
            <div id="audio-player-controls"
                 className="now-playing-buttons">
              {buttons}
            </div>
            <div id="now-playing-state">
              <NowPlaying />
              <div>
                <span>forthcoming</span>
              </div>
            </div>
            <div id="audio-player-song-holder" className="nav navbar-nav navbar-left">

              <QueueIndex queue={this.state.queue}/>
              <div id="now-playing-badge">
                <NowPlayingBadge song={this.state.currentSong} />
              </div>
            </div>
          </div>
        </nav>
      );
    }
  });

}(this));
