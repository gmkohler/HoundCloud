(function(root) {
  'use strict';
  root.SearchIndexSideBar = React.createClass({
    render: function () {
      return (
        <div className="search-sidebar">
          <div>
            <span>All</span>
            <i className="glyphicon glyphicon-search"></i>
          </div>
          <div>
            <span>Users</span>
            <i className="glyphicon glyphicon-user"></i>
          </div>
          <div>
            <span>Songs</span>
            <i className="glyphicon glyphicon-cd"></i>
          </div>
        </div>
      );
    }
  });
}(this));
