(function(root) {
  'use strict';
  root.SearchIndexSideBar = React.createClass({
    _showUsersToggle: function (e) {
      e.preventDefault();
      SearchActions.receiveFilters({showUsers: !this.props.showUsers});
    },
    _showSongsToggle: function (e) {
      e.preventDefault();
      SearchActions.receiveFilters({showSongs: !this.props.showSongs});
    },
    render: function () {
      return (
        <div className="search-sidebar">
          <div>
            <span>All</span>
            <i className="glyphicon glyphicon-search"></i>
          </div>
          <div onClick={this._showUsersToggle}>
            <span>Users: {this.props.showUsers ? "ON" : "OFF"}</span>
            <i className="glyphicon glyphicon-user"></i>
          </div>
          <div onClick={this._showSongsToggle}>
            <span>Songs {this.props.showSongs ? "ON" : "OFF"}</span>
            <i className="glyphicon glyphicon-cd"></i>
          </div>
        </div>
      );
    }
  });
}(this));
