(function(root) {
  'use strict';
  root.NowPlaying = React.createClass({

    componentDidMount: function () {
      this.audio = new Audio();
    },

    // componentWillReceiveProps: function (newProps) {
    //
    // },

    shouldComponentUpdate: function (newProps) {
      return newProps.song.id !== this.props.song.id;
    },

    componentDidUpdate: function () {
      this.audio.setAttribute('src', this.props.song.content_url);
      this.audio.load();
      this.audio.play();
    },

    _onPrev: function () {
      this.audio.currentTime = 0;
    },

    _onNext: function () {
      SongApiActions.shiftQueueForward();
    },

    _playToggle: function () {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },

    render: function () {
      var actionIcon = (!this.audio || this.audio.paused) ? "glyphicon glyphicon-play" : "glyphicon glyphicon-pause"
      var audio,
          song = this.props.song,
          buttons = (
            [<button key="back"
                     type="button"
                     className="btn btn-primary btn-default"
                     onClick={this._onPrev}>
               <i className="glyphicon glyphicon-step-backward"></i>
             </button>,
             <button key="play"
                     type="button"
                     className="btn btn-primary btn-default"
                     onClick={this._playToggle}>
               <i className={actionIcon}></i>
             </button>,
             <button type="button"
                     className="btn btn-primary btn-default"
                     onClick={this._onNext}>
               <i className="glyphicon glyphicon-step-forward"></i>
             </button>]
      );

      return (
        <div>
          {buttons}
          <span>{song.title}</span>
        </div>
      );
    }
  });
}(this));
