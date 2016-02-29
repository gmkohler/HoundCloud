(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserSearchIndexItem = React.createClass({
    getInitialState: function () {
      return {followText: "Follow"};
    },

    _followToggle: function (e) {
      e.preventDefault();
      if (this.props.user.isFollowed) {
        this._unfollowUser();
      } else {
        this._followUser();
      }
    },
    // not very flux-y with the setState-ing. should only be done when the user
    // in the searchStore is updated...
    _followUser: function () {
      FollowingApiUtil.addFollowing(this.props.user.id);
      this.setState({followText: "Following"});
    },

    _unfollowUser: function () {
      FollowingApiUtil.removeFollowing(this.props.user.id);
      this.setState({followText: "Follow"});
    },

    render: function () {
      var user = this.props.user,
          userUrl = "users/" + user.id,
          indexItem;

      var thumbnailStyle = {
        backgroundImage: "url(" + user.image_url + ")"
      };

      if (user) {
        indexItem = (
          <div className="clearfix user-search-item">
            <div className="user-search-item-thumbnail-container">
              <div className="user-search-item-thumbnail"
                   style={thumbnailStyle}></div>
            </div>
            <div className="user-search-item-detail">
              <button className="btn btn-xs btn-user-search btn-follow"
                onClick={this._followToggle}>
                {this.state.followText}</button>
              <div className="user-search-item-info">
                <Link to={userUrl}>{user.username}</Link>
              </div>
              <div className="user-search-item-stats">
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
      } else {
        indexItem = <div></div>
      }

      return indexItem;
    }

  });
}(this));
