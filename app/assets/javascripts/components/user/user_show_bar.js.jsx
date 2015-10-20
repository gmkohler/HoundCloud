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
            <button className="btn btn-sm"
                    onClick={FollowingApiUtil.removeFollowing.bind(null, user.followingID)}>
              Following
            </button>
          );
      } else {
          return (
            <button className="btn btn-sm"
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
