(function(root) {
  'use strict';
  root.SearchIndex = React.createClass({
    getInitialState: function () {
      return ({numUsers: 0,
               numSongs: 0,
               showUsers: true,
               showSongs: true});
     },

     _showUsersToggle: function (e) {
       e.preventDefault();
       SearchActions.receiveFilters({showUsers: !this.state.showUsers});
     },

     _showSongsToggle: function (e) {
       e.preventDefault();
       SearchActions.receiveFilters({showSongs: !this.state.showSongs});
     },

    componentDidMount: function () {
      SearchStore.addFiltersChangeListener(this._onFiltersChange);
    },

    _onFiltersChange: function () {
      this.setState(SearchStore.getFilters());
    },

    _headerIcon: function(show) {
      return show ? "glyphicon-menu-down" : "glyphicon-menu-right";
    },

    render: function () {
      var showUsers = this.state.showUsers,
          showSongs = this.state.showSongs,
          query;
      if (this.props.location) {
        query = this.props.location.query.searchQuery;
      } else {
        query = "";
      }

      return (
        <div>
          <SearchIndexHeader query={query}/>
          <div>
            <SearchIndexSideBar showUsers={this.state.showUsers}
                                usersToggle={this._showUsersToggle}
                                showSongs={this.state.showSongs}
                                songsToggle={this._showSongsToggle}/>
            <div className="search-results-container">
              <div className="clearfix search-index-header">
                <div className="clearfix search-index-bar search-results">
                  <div className="clearfix left">
                    <span>Users</span>
                  </div>
                  <div className="clearfix right">
                    <i className={"glyphicon " + this._headerIcon(showUsers)}
                       onClick={this._showUsersToggle}/>
                  </div>
                </div>
              </div>
              <UserSearchIndex query={query} />
                <div className="clearfix search-index-header">
                  <div className="clearfix search-index-bar search-results">
                    <div className="clearfix left">
                      <span>Songs</span>
                    </div>
                    <div className="clearfix right">
                      <i className={"glyphicon " + this._headerIcon(showSongs)}
                         onClick={this._showSongsToggle}/>
                    </div>
                  </div>
                </div>
              <FeedIndex context="search" data={query}/>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
