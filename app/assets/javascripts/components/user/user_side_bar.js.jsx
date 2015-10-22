(function(root) {
  'use strict';
  root.UserSideBar = React.createClass({
    render: function () {
      var user = this.props.user;
      return (
        <div id="profile-sidebar">
          <div>
            <span>Followers</span>
            <span>{user.numFollowers}</span>
          </div>
          <div>
            <span>Following</span>
            <span>{user.numFollowing}</span>
          </div>
          <div>
            <span>Tracks</span>
            <span>{user.numTracks}</span>
          </div>
        </div>
      );
    }
  });
}(this));
