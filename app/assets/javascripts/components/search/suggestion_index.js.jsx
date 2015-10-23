/* global UserStore*/
/* global UserApiUtil*/
/* global React*/
(function(root) {
  'use strict';
  root.SuggestionIndex = React.createClass({
    getInitialState: function () {
      return ({suggestions: {users: [], songs: []}});
    },

    componentDidMount: function () {
      SearchStore.addResultsChangeListener(this._getSuggestionsFromStore);
      this._updateSuggestions(this.state.searchQuery);
    },

    componentWillUnmount: function () {
      SearchStore.removeResultsChangeListener(this._getSuggestionsFromStore);
    },

    componentWillReceiveProps: function (newProps) {
      this._updateSuggestions(newProps.searchQuery);
    },

    _updateSuggestions: function (searchQuery) {
      UserApiUtil.fetchQueriedUsers(searchQuery);
      SongApiUtil.fetchQueriedSongs(searchQuery);
    },

    _getSuggestionsFromStore: function () {
      if (this.props.searchQuery === "") {
        this.setState({suggestions: {users: [], songs: []}});
      } else {
        this.setState(
          {suggestions: SearchStore.getMatchingResuls(this.props.searchQuery, 5)}
        );
      }
    },

    render: function () {
      var userIndexItems = this.state.suggestions.map(function(user) {
        return (<UserSuggestionIndexItem key={user.id} user={user}/>);
      });
      var songIndexItems = this.state.suggestions.map(function(user) {
        return (<SongSuggestionIndexItem key={song.id} song={song}/>);
      });

      return (
        <div><span>Users</span></div>
        <ul className="auto-search">
          {userIndexItems}
        </ul>
        <div><span>Songs</span></div>
        <ul className="auto-search">
          {songIndexItems}
        </ul>
      )
    }

  });
}(this));
