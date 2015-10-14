(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({
    render: function () {
      return (
        <div>
          {this.props.song.title}
        </div>
      );
    }
  });
}(this));
