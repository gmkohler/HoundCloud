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

    activateSongForm: function (e) {
      e.preventDefault();
      ModalActions.activateSongFormModal();
    },

    collectionClickHandler: function (e) {
      e.preventDefault();
    },

    render: function () {
      return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">HoundCloud</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="selected"><Link to="#">Home</Link></li>
                <li id="collections"> <Link to="#">Collection</Link></li>
              </ul>
              <div className="col-md-5">
                <SearchBar onSearch={this.props.onSearch} />
              </div>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link className="nav navbar-nav navbar-left"
                        to="javascript:void(0)"
                        onClick={this.activateSongForm}>
                        Upload
                  </Link>
                </li>
                <li className="dropdown">

                  <a href="#"
                     className="dropdown-toggle"
                     data-toggle="dropdown"
                     role="button"
                     aria-has-popup="true"
                     aria-expanded="false">
                    <div>
                      <span id="navbar-image"/>
                      {CURRENT_USER_USERNAME}
                      <span className="caret"/>
                    </div>
                  </a>

                   <ul className="dropdown-menu">
                     <li>
                       <Link to={"users/"+CURRENT_USER_ID}>View Profile</Link>
                     </li>
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
