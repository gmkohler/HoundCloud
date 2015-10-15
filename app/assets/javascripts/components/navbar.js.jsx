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
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">HoundCloud</Link>
            </div>
            <div className="collapse navbar-collapse">
              <form className="navbar-form navbar-left"
                    role="search"
                    onSubmit={this.onSearch}>
                <div className="form-group has-feedback">
                  <input type="text"
                         className="form-control"
                         valueLink={this.linkState("searchQuery")}
                         placeholder="search for users"/>
                  <i className="glyphicon glyphicon-search form-control-feedback"/>
                </div>
              </form>
              <SuggestionIndex searchQuery={this.state.searchQuery}/>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
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
          </div>
        </nav>
      );
    }
  });
}(this));
