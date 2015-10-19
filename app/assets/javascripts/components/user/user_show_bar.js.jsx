/* global React */
(function(root) {
  'use strict';
  root.UserShowBar = React.createClass({
    render: function () {
      return (
        <div className="user-info-bar container">
          <span className="user-info-bar user-info-header">
            Hello World
          </span>
          <div className="user-info-bar-buttons">
            <button className="btn btn-primary btn-sm">
              Follow
            </button>
          </div>
        </div>
      );
    }
  });
}(this));
