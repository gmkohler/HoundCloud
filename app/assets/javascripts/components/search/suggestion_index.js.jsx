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
      this._updateSuggestions(this.props.searchQuery);
    },

    componentWillUnmount: function () {
      SearchStore.removeResultsChangeListener(this._getSuggestionsFromStore);
    },

    componentWillReceiveProps: function (newProps) {
      this._updateSuggestions(newProps.searchQuery);
    },

    _updateSuggestions: function (searchQuery) {
      UserApiUtil.fetchQueriedUsers(searchQuery);
      SongApiUtil.fetchSongsByContext("search", searchQuery);
    },

    _getSuggestionsFromStore: function () {
      if (this.props.searchQuery === "") {
        this.setState({suggestions: {users: [], songs: []}});
      } else {
        this.setState(
          {suggestions: SearchStore.getMatchingResults(this.props.searchQuery, 5)}
        );
      }
    },

    render: function () {
      var suggs = this.state.suggestions;
      var userIndexItems = suggs.users.map(function(user) {
        return (<UserSuggestionIndexItem key={user.id} user={user}/>);
      });
      var userSuggestions = (
        <ul className="auto-search">
          <li><span>Users</span></li>
          {userIndexItems}
        </ul>
      );

      var songIndexItems = suggs.songs.map(function(song) {
        return (<SongSuggestionIndexItem key={song.id} song={song}/>);
      });

      var songSuggestions = (
        <ul className="auto-search">
          <li><span>Songs</span></li>
          {songIndexItems}
        </ul>
      );

      return (
        <div id="suggestion-index">
         {this.props.searchQuery ? userSuggestions : null}
         {this.props.searchQuery ? songSuggestions : null}
        </div>
      )
    }

  });
}(this));
