/* global React */
(function(root) {
  'use strict';
  // Note: could write two react components for (dropdown when logged in) and
  // (please login) when logged out.   Bonus!!
  var Link = ReactRouter.Link;
  root.Navbar = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {searchQuery: ""};
    },

    goToHomePage: function (e) {
      e.preventDefault();
      window.location = "/";
    },

    onSearch: function (e) {
      e.preventDefault();
      this.props.onSearch(this.state.searchQuery);
    },

    render: function () {
      return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">HoundCloud</Link>
            </div>
            <SearchBar onSearch={this.props.onSearch} />
            <div className="nav navbar-nav">
              <button className="btn btn-small">
                <Link to="songs/new">Upload Song</Link>
              </button>
            </div>
            <AudioPlayer />

              <ul className="nav navbar-nav navbar-right">
                <li className="col-lg-4 dropdown">
                  <a href="#"
                     className="dropdown-toggle"
                     data-toggle="dropdown"
                     role="button"
                     aria-has-popup="true"
                     aria-expanded="false">welcome, {CURRENT_USER_USERNAME} <span className="caret"/></a>
                   <ul className="dropdown-menu">
                     <li><Link to={"users/"+CURRENT_USER_ID}>View Profile</Link></li>
                     <li onClick={ApiUtil.logOut}><a href="#">Sign Out</a></li>
                   </ul>
                </li>
              </ul>

          </div>
        </nav>
      );
    }
  });
}(this));
