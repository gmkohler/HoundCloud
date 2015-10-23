(function(root) {
  'use strict';
  root.UserSuggestionIndexItem = React.createClass({
    render: function () {
      var user = this.props.user
      return (
        <li>
          <div>
            <Link to={'/users/' + user.id}>{user.username}</Link>
              <button className="btn btn-sm"
                      onClick={this._followToggle}>
                {user.isFollowed ? "Unfollow" : "Follow"}
              </button>
          </div>
        </li>
      );
    }
  })
}(this));
