(function(root) {
  'use strict';
  // Note: could write two react components for (dropdown when logged in) and
  // (please login) when logged out.   Bonus!!

  root.Navbar = React.createClass({
    render: function () {
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">HoundCloud</a>
            </div>

            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#"
                   className="dropdown-toggle"
                   data-toggle="dropdown"
                   role="button"
                   aria-has-popup="true"
                   aria-expanded="false">welcome, {CURRENT_USER_USERNAME}</a>
                 <ul className="dropdown-menu">
                    <li>ADD user/:id BELOW!!</li>
                   <li><a href="#">View Profile</a></li>
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
