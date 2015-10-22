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

    render: function () {
      var query;
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
              <UserSearchIndex query={query} />
              <FeedIndex context="search" data={query}/>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
