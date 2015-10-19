// Has a user prop

(function(root) {
  'use strict';

  root.FeedIndex = React.createClass({
    getInitialState: function () {
      return {songs: []};
    },

    onSongChange: function () {
      this.setState({songs: SongStore.getAll()});
    },

    componentDidMount: function () {
      debugger;
      SongStore.addChangeListener(this.onSongChange);
      SongApiUtil.fetchUserSongs(this.props.user.id, this.props.home);
    },

    componentWillReceiveProps: function (newProps) {
      debugger;
      SongApiUtil.fetchUserSongs(newProps.user.id, newProps.home);
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
