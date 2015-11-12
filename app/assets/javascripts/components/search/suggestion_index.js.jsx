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
      if (this.props.searchQuery) {
        this._updateSuggestions(this.props.searchQuery);
      }
    },

    componentWillUnmount: function () {
      SearchStore.removeResultsChangeListener(this._getSuggestionsFromStore);
    },

    componentWillReceiveProps: function (newProps) {
      this._updateSuggestions(newProps.searchQuery);
    },

    stayExpanded: function (e) {
      e.stopPropagation();
    },

    _updateSuggestions: function (searchQuery) {
      if (searchQuery) {
        UserApiUtil.fetchQueriedUsers(searchQuery);
        SongApiUtil.fetchSongsByContext("search", searchQuery);
      }
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
        return (<li><SideBarFollowIndexItem key={user.id} user={user}/></li>);
      });

      var userSuggestions = (
        <ul className="auto-search">
          <li className="search-suggestion-header"><span>Users</span></li>
          {userIndexItems}
        </ul>
      );

      var songIndexItems = suggs.songs.map(function(song) {
        return (<li><QueueIndexItem key={song.id} context="search" song={song}/></li>);
      });

      var songSuggestions = (
        <ul className="queue-index-item">
          <li className="search-suggestion-header"><span>Songs</span></li>
          {songIndexItems}
        </ul>
      );


      return (
        <div className="col-lg-6"
             id="suggestion-index">
         {this.props.searchQuery ? userSuggestions : null}
         {this.props.searchQuery ? songSuggestions : null}
        </div>
      )
    }

  });
}(this));
