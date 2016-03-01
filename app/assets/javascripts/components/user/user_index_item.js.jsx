(function(root) {
  'use strict';
  root.SideBarFollowIndexItem = React.createClass({

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

    _handleLinkClick: function (e) {
      e.currentTarget.blur();
      this.props.clearQuery();
    },

    render: function () {
      var user = this.props.user;
      var userUrl = "users/" + user.id;
      var thumbnailStyle = {
        backgroundImage: "url(" + user.image_url + ")"
      };
      var followText = this.props.user.isFollowed ? "Following" : "Follow";
      var buttonClass = this.props.user.isFollowed ? " selected" : "";

      return(
        <div className="clearfix sidebar-follow-item">
          <button className={"btn btn-xs btn-follow" + buttonClass}
                  onClick={this._followToggle}>
            {followText}</button>
          <div className="sidebar-follow-item-thumbnail-container">
            <div className="sidebar-follow-item-thumbnail"
                 style={thumbnailStyle}/>
          </div>
          <div className="sidebar-follow-item-detail">
            <div className="sidebar-follow-item-info">
              <Link to={userUrl}
                    onClick={this._handleLinkClick}>{user.username}</Link>
            </div>
            <div className="sidebar-follow-item-stats">
              <div>
                <span>{user.numTracks}</span>
                <i className="glyphicon glyphicon-music"/>
              </div>
              <div>
                <span>{user.numFollowers}</span>
                <i className="glyphicon glyphicon-user"/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  })
}(this));
