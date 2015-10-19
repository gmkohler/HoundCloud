/* global React */
(function(root) {
  'use strict';
  root.UserShowBar = React.createClass({

    _followButton: function () {
      var user = this.props.user;
      if (user.id === CURRENT_USER_ID || typeof user.isFollowed === "undefined") {
        return;
      } else if (user.isFollowed) {
          return (
            <button className="btn btn-primary btn-sm"
                    onClick={FollowingApiUtil.removeFollowing.bind(null, user.followingID)}>
              Following
            </button>
          );
      } else {
          return (
            <button className="btn btn-primary btn-sm"
                    onClick={FollowingApiUtil.addFollowing.bind(null, user.id)}>
              Follow
            </button>
          );
      }
    },

    render: function () {
      var user = this.props.user;
      var followButton = this._followButton();

      return (
        <div className="user-info-bar container">
          <span className="user-info-bar user-info-header">
            Hello World
          </span>
          <div className="user-info-bar-buttons">
            {followButton}
          </div>
        </div>
      );
    }
  });
}(this));
