(function(root) {
  'use strict';
  root.UserIndexItem = React.createClass({
    render: function () {
      console.log(user.username);
      return (
        <div>
          {this.props.user.username}
        </div>
      );
    }
  });
}(this));
