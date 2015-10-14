// Has a user prop

(function(root) {
  'use strict';

  root.FeedIndex = React.createClass({
    getInitialState: function () {
      return {songs: SongStore.getAll()};
    },

    onSongChange: function () {
      this.setState({songs: SongStore.getAll()});
    },

    componentDidMount: function () {
      SongStore.addChangeListener(this.onSongChange);

    },

    componentWillReceiveProps: function (newProps) {
      SongApiUtil.fetchUserSongs(newProps.user.id);
    },

    componentWillUnmount: function () {
      SongStore.removeChangeListener(this.onSongChange);
    },

    render: function () {
      var indexItems = this.state.songs.map(function (song) {
        return (
          <FeedIndexItem key={song.id} song={song}/>
        );
      });

      return (
        <div id="feed-index" className="container">
          {indexItems}
        </div>
      );
    }
  });
}(this));
