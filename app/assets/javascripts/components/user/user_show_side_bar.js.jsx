(function(root) {
  'use strict';
  root.UserShowSideBar = React.createClass({
    render: function () {
      var user = this.props.user;
      return (
        <div id="profile-sidebar">
          <div id="sidebar-stat-container">
            <div class="sidebar-stat">
              <span class="sidebar-stat-heading">Followers</span>
              <span class="sidebar-stat-num">{user.numFollowers}</span>
            </div>
            <div class="sidebar-stat">
              <span class="sidebar-stat-heading">Following</span>
              <span class="sidebar-stat-num">{user.numFollowing}</span>
            </div>
            <div class="sidebar-stat">
              <span class="sidebar-stat-heading">Tracks</span>
              <span class="sidebar-stat-num">{user.numTracks}</span>
            </div>
          </div>

          <div id="sidebar-suggested-users">

          </div>
        </div>
      );
    }
  });
}(this));
