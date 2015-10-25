(function(root) {
  'use strict';
  root.SideBarFollowIndexItem = React.createClass({
    getInitialState: function () {
      return {followText: "Follow"};
    },

    _followToggle: function (e) {
      e.preventDefault();
      this.props.user.isFollowed ? this._unfollowUser() : this._followUser();
    },

    _followUser: function () {
      FollowingApiUtil.addFollowing(this.props.user.id);
      this.setState({followText: "Unfollow"});
    },

    _unfollowUser: function () {
      FollowingApiUtil.removeFollowing(this.props.user.id);
      this.setState({followText: "Follow"});
    },

    render: function () {
      // var thumbnailStyle = {
      //   backgroundImage: this.props.user.image_url
      // };

      return(
        <div className="clearfix sidebar-follow-item">
          <button className="btn btn-xs btn-song-index btn-sidebar-follow"
                  onClick={this._followToggle}>
            {this.state.followText}</button>
          <div className="sidebar-follow-item-thumbnail-container">
            <div className="sidebar-follow-item-thumbnail"/>
          </div>
          <div className="sidebar-follow-item-detail">
            <div className="sidebar-follow-item-info">
              <span>username</span>
            </div>
            <div className="sidebar-follow-item-stats">
              <div>
                <span>numTracks</span>
                <i className="glyphicon glyphicon-music"/>
              </div>
              <div>
                <span>numFollowers</span>
                <i className="glyphicon glyphicon-user"/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  })
}(this));
