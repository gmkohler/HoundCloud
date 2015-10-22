(function(root) {
  'use strict';
  root.SearchIndex = React.createClass({

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
            <SearchIndexSideBar />
            <UserSearchIndex query={query} />
            <FeedIndex context="search" data={query}/>
          </div>
        </div>
      );
    }
  });
}(this));
