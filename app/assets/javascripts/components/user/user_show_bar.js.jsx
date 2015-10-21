/* global React */
(function(root) {
  'use strict';
  root.UserShowBar = React.createClass({
    _followToggle: function (e) {
      e.preventDefault();
      this.props.user.isFollowed ? this._unfollowUser() : this._followUser();
    },

    _followUser: function () {
      FollowingApiUtil.addFollowing(this.props.user.id);
    },

    _unfollowUser: function () {
      FollowingApiUtil.removeFollowing(this.props.user.id);
    },

    _followButton: function () {
      var user = this.props.user;

      if (user.id === CURRENT_USER_ID || typeof user.isFollowed === "undefined") {
        return;
      } else {
        return (
          <button className="btn btn-sm"
                  onClick={this._followToggle}>
            {user.isFollowed ? "Unfollow" : "Follow"}
          </button>
        );
      }
    },

    render: function () {
      var user = this.props.user;
      var followButton = this._followButton();

      return (
        <div className="user-show-bar clearfix">
          <div className="explore-tabs">
            <div className="user-bar">
              <div className="user-bar-section-left">
                <a className="active" href="javascript:void(0)">Tracks</a>
              </div>
              <div className="user-bar-section-right">
                  {followButton}
              </div>
            </div>

          </div>
        </div>
    );
    }
  });
}(this));
