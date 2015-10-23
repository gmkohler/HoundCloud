(function(root) {
  'use strict';
  root.NowPlaying = React.createClass({
    getInitialState: function () {
      return {paused: true, src: "", currentTime: 0};
    },

    componentDidMount: function () {
      this.audio = new Audio();
      this.audio.addEventListener("ended", this._onEnded, false);
      this.audio.addEventListener("timeupdate", this._onTimeUpdate, false);
      this.audio.addEventListener("loadedmetadata", this._onLoadedMetadata, false);
      AudioStore.addChangeListener(this._onAudioChange);
    },

    componentWillUnmount: function () {
      this.audio.removeEventListener("ended", this._onEnded);
      this.audio.removeEventListener("timeupdate", this._onTimeUpdate);
      this.audio.addEventListener("loadedmetadata", this._onLoadedMetadata, false);
      AudioStore.addChangeListener(this._onAudioChange);
    },


    _onAudioChange: function () {
      var params = AudioStore.getParams();
      this.setState({
        paused: params.paused,
        src: params.src,
        currentTime: params.currentTime});
    },

    componentWillUpdate: function (_, newState) {
      if (this.state.paused !== newState.paused && this.state.src === newState.src) {
        this._togglePlay();
      }
      if (this.state.src !== newState.src) {
        this.audio.pause();
        this.audio.src = newState.src;
        this.audio.load();
        if (!newState.paused) {this.audio.play();}
      }

      if (newState.currentTime === 0) {this.audio.currentTime === 0;}
    },

    _onEnded: function () {
      SongApiActions.shiftQueueForward();
    },

    _onTimeUpdate: function (e) {
      AudioActions.receiveCurrentTime(this.audio.currentTime);
    },

    _onLoadedMetadata: function (e) {
      var newTrack = e.currentTarget,
       currentTime = 0,
          duration = 0;
      if (!!newTrack.src) {
        currentTime = newTrack.currentTime,
           duration = newTrack.duration;
      }
      AudioActions.receiveMetadata({duration: duration});
    },

    _togglePlay: function () {
      var audio = this.audio;
      audio.paused ? audio.play() : audio.pause();
    },

    render: function () {
      return (<div id="now-playing"><span>""</span></div>);
    }
  });
}(this));
