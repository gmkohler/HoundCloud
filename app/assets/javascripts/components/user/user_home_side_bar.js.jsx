/* global React */
(function(root) {
  'use strict';
  root.UserHomeSideBar = React.createClass({
    propTypes: {
    },
    render: function () {
      return (
        <div id="profile-sidebar">
          <SideBarFollowIndex />
          <SideBarLikesIndex userId={CURRENT_USER_ID} />
        </div>
      );
    }
  });
}(this));
