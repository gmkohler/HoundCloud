// Has a user prop

(function(root) {
  'use strict';

  root.FeedIndex = React.createClass({
    getInitialState: function () {
      return {songs: []};
    },

    _setStateByContext: function (context, data) {
      switch (context) {
        case "home":
          this.setState({songs: SongStore.getStream()});
          break;
        case "search":
          this.setState({songs: SongStore.getByTitle(data.id)});
          break;
        case "show":
          this.setState({songs: SongStore.getTracksAndReposts(data.id)});
          break;
        case "showTracks":
          this.setState({songs: SongStore.getTracks(data.id)});
          break;
        case "showReposts":
          this.setState({songs: SongStore.getReposts(data.id)});
          break;
      }
    },

    onSongChange: function () {
      this._setStateByContext(this.props.context, this.props.data);
    },

    componentDidMount: function () {
      SongStore.addChangeListener(this.onSongChange);
      if (this.props.context === "search") {
        SongApiUtil.fetchSongsByContext(this.props.context, this.props.data);
      }
    },

    componentWillReceiveProps: function (newProps) {
      // User can only access "showTracks" and "showReposts" after the feed
      // has received the "show" context.
      if (["home", "show"].indexOf(newProps.context) !== -1) {
        SongApiUtil.fetchSongsByContext(newProps.context, newProps.data);
      }
      if (["showTracks", "showReposts"].indexOf(newProps.context) !== -1) {
        this._setStateByContext(newProps.context, newProps.data);
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
        <div >
          {this.props.context === "home" ? homeHeader : null}
          <div id="feed-index" className="container">
            {indexItems}
          </div>
        </div>
      );
    }
  });
}(this));
