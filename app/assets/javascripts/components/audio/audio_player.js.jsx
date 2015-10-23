/* global React */
(function(root) {
  'use strict';

  root.AudioPlayer = React.createClass({
    getInitialState: function () {
      return {currentSong: {content_url: ""}, queue: []};
    },

    componentDidMount: function () {
      SongStore.addQueueChangeListener(this._queueChange);
    },

    _queueChange: function () {
      var queue = SongStore.getQueue(),
          currentSong = queue.splice(0, 1)[0] || {content_url: ""};
      // debugger;
      this.setState({currentSong: currentSong, queue: queue});
    },

    _onPrev: function () {
      // maybe later get the queue store to have tons of songs,
      // and have the back button *actually* go back.

      // for now (i.e., the near future), get the back button to send the song
      // to its beginning.
    },

    render: function () {
      // Need to add in Queue again...
      return (
        <nav id="audio-player" className="nav navbar-default navbar-fixed-bottom">
          <div className="container">
            <NowPlaying song={this.state.currentSong}/>
            <div id="now-playing">
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
