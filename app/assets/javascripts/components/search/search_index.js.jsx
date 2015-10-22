(function(root) {
  'use strict';
  root.SearchIndex = React.createClass({

    render: function () {

      var query;
      if (this.props.params.location) {
        query = this.props.params.location.query.searchQuery;
      } else {
        query = "";
      }

      return (
        <div>
          <SearchIndexHeader query={query}/>
          <div>
            <SearchIndexSideBar />
            <UserSearchIndex query={query} />
            <FeedIndex context={"search"} data={query}/>
          </div>
        </div>
      );
    }
  });
}(this));
