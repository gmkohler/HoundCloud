/* global React */
(function(root) {
  'use strict';

  root.AudioPlayer = React.createClass({
    getInitialState: function () {
      return {currentSong: {}, queue: []};
    },

    componentDidMount: function () {
      SongStore.addQueueChangeListener(this._queueChange);
    },

    _queueChange: function () {
      var queue = SongStore.getQueue(),
          currentSong = queue.splice(0, 1)[0];
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
      var queue = this.state.queue.map(function(song){
        return <li>{song.title}</li>;
      });

      return (
        <div className="nav navbar-nav navbar-left">
          <NowPlaying song={this.state.currentSong}/>
          <ul>{queue}</ul>
        </div>
      );
    }
  });

}(this));
