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
          this.setState({songs: SearchStore.getSongs(data)});
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

    _onSongChange: function () {
      this._setStateByContext(this.props.context, this.props.data);
    },

    componentDidMount: function () {
      if (this.props.context === "search") {
        SearchStore.addResultsChangeListener(this._onSongChange);
        SearchStore.addFiltersChangeListener(this._onSongChange);
        if (this.props.data.id) {

          SongApiUtil.fetchSongsByContext(this.props.context, this.props.data);
        }
      } else {
        SongStore.addChangeListener(this._onSongChange);
      }
    },

    componentWillReceiveProps: function (newProps) {
      // User can only access "showTracks" and "showReposts" after the feed
      // has received the "show" context.
      if (["home", "show"].indexOf(newProps.context) !== -1 && newProps.data) {

        SongApiUtil.fetchSongsByContext(newProps.context, newProps.data);
      }
      if (["showTracks", "showReposts"].indexOf(newProps.context) !== -1) {

        this._setStateByContext(newProps.context, newProps.data);
      }
    },

    componentWillUnmount: function () {
      if (this.props.context === "search") {
        SearchStore.removeResultsChangeListener(this._onSongChange);
        SearchStore.removeFiltersChangeListener(this._onSongChange);
      } else {
        SongStore.removeChangeListener(this._onSongChange);
      }
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
        <div id="feed-index">
          {this.props.context === "home" ? homeHeader : null}
          <div id="feed-index-container">
            {indexItems}
          </div>
        </div>
      );
    }
  });
}(this));
