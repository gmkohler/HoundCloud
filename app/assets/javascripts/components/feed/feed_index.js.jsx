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
      SongApiUtil.fetchUserSongs({id: this.props.user.id});
      // need to fetch songs based on something. i.e., user id.
      // ApiUtil will know how to make this request.
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
