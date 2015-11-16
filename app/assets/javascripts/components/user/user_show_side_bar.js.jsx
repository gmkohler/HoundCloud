(function(root) {
  'use strict';
  root.UserShowSideBar = React.createClass({
    render: function () {
      var user = this.props.user || {numFollowers: 0, numFollowing: 0, numTracks: 0, bio: ""};
      return (
        <div id="profile-sidebar">
          <div className="clearfix" id="sidebar-stat-container">
            <div className="sidebar-stat">
              <div className="clearfix">
                <span className="sidebar-stat-heading">Followers</span>
              </div>
              <div className="clearfix">
                <span className="sidebar-stat-num">{user.numFollowers}</span>
              </div>
            </div>
            <div className="sidebar-stat">
              <div className="clearfix">
                <span className="sidebar-stat-heading">Following</span>
              </div>
              <div className="clearfix">
                <span className="sidebar-stat-num">{user.numFollowing}</span>
              </div>
            </div>
            <div className="sidebar-stat">
              <div className="clearfix"><span className="sidebar-stat-heading">Tracks</span></div>
              <div className="clearfix"><span className="sidebar-stat-num">{user.numTracks}</span></div>
            </div>
          </div>
          <div>
            <p>{user.bio}</p>
          </div>
          <SideBarFollowIndex/>
        </div>
      );
    }
  });
}(this));
