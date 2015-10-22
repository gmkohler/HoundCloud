/* global React */
(function(root) {
  'use strict';
  root.UserHomeSideBar = React.createClass({
    render: function () {
      return (
        <div id="profile-sidebar">
          <SideBarFollowIndex />
        </div>
      );
    }
  });
}(this));
