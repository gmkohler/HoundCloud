// Has a user prop

(function(root) {
  'use strict';

  root.FeedIndex = React.createClass({
    getInitialState: function () {
      return {songs: []};
    },

    _setStateByContext: function (context) {
      switch (context) {
        case "home":
          this.setState({songs: SongStore.getFollows()});
          break;
        case "search":
          this.setState({songs: SongStore.getByTitle(this.props.query)});
          break;
        case "show":
          this.setState({songs: SongStore.getTracksAndReposts(this.props.user.id)});
          break;
        case "showTracks":
          this.setState({songs: SongStore.getTracks(this.props.user.id)});
          break;
        case "showReposts":
          this.setState({songs: SongStore.getReposts(this.props.user.id)});
          break;
      }
    },

    onSongChange: function () {
      this._setStateByContext(this.props.context);
    },

    componentDidMount: function () {
      SongStore.addChangeListener(this.onSongChange);
    },

    componentWillReceiveProps: function (newProps) {
      if (newProps.user) {
        SongApiUtil.fetchUserSongs(newProps.user.id, newProps.home);
      }
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

      var homeHeader = (
        <h1 className="user-home-header">
          Keep your ear to the ground for sounds from your favorite hounds
        </h1>
      );

      return (
        <div>
          {this.props.context === "home" ? homeHeader : null}
          <div id="feed-index" className="container">
            {indexItems}
          </div>
        </div>
      );
    }
  });
}(this));
