(function(root) {
  'use strict';
  root.SuggestionIndexItem = React.createClass({
    render: function () {
      return (<div>{this.props.user.username}</div>);
    }
  })
}(this));
