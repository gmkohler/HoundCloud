(function(root) {
  'use strict';
  root.SearchIndex = React.createClass({

    render: function () {
      
      var query = "";

      if (this.props.params.location) {
        query = this.props.params.location.query.searchQuery;
      }

      return (
        <UserIndex query={query} />
      );
    }
  });
}(this));
