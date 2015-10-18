(function(root) {
  'use strict';
  root.NowPlaying = React.createClass({
    getInitialState: function () {
      return {paused: true};
    },

    componentDidMount: function () {
      this.audio = new Audio();
    },

    shouldComponentUpdate: function (newProps) {
      return newProps.song.id !== this.props.song.id;
    },

    componentDidUpdate: function () {
      if (this.props.song.content_url !== this.audio.src) {
        this._loadNewSong();
      }
    },

    _loadNewSong: function () {
      this.audio.setAttribute('src', this.props.song.content_url);
      this.audio.load();
      this.audio.play();
      this.setState({paused: false});
    },

    _onPrev: function (e) {
      // see AudioPlayer for further notes.
      e.preventDefault()
      this.audio.currentTime = 0;
    },

    _onNext: function (e) {
      e.preventDefault();
      SongApiActions.shiftQueueForward();
    },

    _playToggle: function (e) {
      e.preventDefault();
      if (!this.audio.src) {return;}
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.setState({paused: !this.state.paused});
    },

    _actionIcon: function () {
      if (!this.audio || this.audio.paused) {
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
                         className="btn btn-xl playback-btn skip"
                         onClick={this._onNext}>
                   <i className="glyphicon glyphicon-step-forward"></i>
                 </button>
               </a>,
               <a href="javascript:void(0)">
                 <button type="button"
                         className="btn btn-xl playback-btn repeat">
                   <i className="glyphicon glyphicon-repeat"></i>
                 </button>
               </a>]
      );

      return (
        <div className="container">
          {buttons}
          <NowPlayingBadge song={song}/>
        </div>
      );
    }
  });
}(this));
