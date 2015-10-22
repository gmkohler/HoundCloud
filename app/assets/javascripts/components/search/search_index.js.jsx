(function(root) {
  'use strict';
  root.SearchIndex = React.createClass({
    getInitialState: function () {
      return ({numUsers: 0,
               numSongs: 0,
               showUsers: true,
               showSongs: true});
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
                                showSongs={this.state.showSongs} />
            <div className="search-results-container">
              <div>
                <span>Users:</span>
                <i className={"glyphicon " + this._headerIcon(showUsers)}/>
              </div>
              <UserSearchIndex query={query} />
              <div>
                <span>Songs:</span>
                <i className={"glyphicon " + this._headerIcon(showSongs)}/>
              </div>
              <FeedIndex context="search" data={query}/>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
