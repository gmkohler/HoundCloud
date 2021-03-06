(function(root) {
  'use strict';
  root.UserSuggestionIndexItem = React.createClass({
    _followToggle: function (e) {
      e.preventDefault();
    },

    render: function () {
      var user = this.props.user
      return (
        <li>
          <div>
            <Link to={'users/' + user.id}>{user.username}</Link>
              <button className="btn btn-sm"
                      onClick={this._followToggle}>
                {user.isFollowed ? "Following" : "Follow"}
              </button>
          </div>
        </li>
      );
    }
  })
}(this));
