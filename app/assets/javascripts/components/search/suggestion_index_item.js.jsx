(function(root) {
  'use strict';
  root.SuggestionIndexItem = React.createClass({
    render: function () {
      var user = this.props.user
      return (
        <li>
          <Link to={'/users/' + user.id}>{user.username}</Link>
        </li>
      );
    }
  })
}(this));