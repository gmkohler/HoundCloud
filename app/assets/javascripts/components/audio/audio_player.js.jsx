/* global React */
(function(root) {
  'use strict';

  root.AudioPlayer = React.createClass({
    getInitialState: function () {
      return {currentSong: {}, queue: []};
    },

    componentDidMount: function () {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      SongStore.addQueueChangeListener(this._queueChange);
    },

    _queueChange: function () {
      var queue = SongStore.getQueue(),
          currentSong = queue.splice(0, 1)[0];
      this.setState({currentSong: currentSong, queue: queue});
    },

    _onNext: function () {
      // go to next track? shit maybe an api request for _queue.
    },

    _onPrev: function () {
      // maybe later get the queue store to have tons of songs,
      // and have the back button *actually* go back.

      // for now (i.e., the near future), get the back button to send the song
      // to its beginning.
    },

    render: function () {

      var queuedSongs = this.state.queue.map(function(song) {
        return (<AudioElement key={song.id} song_url={song.content_url} />);
      });

      return (
        <div>
          <NowPlaying song={this.state.currentSong}/>
          {queuedSongs}
        </div>
      );
    }
  });

}(this));
