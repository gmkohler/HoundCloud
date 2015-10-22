(function(root) {
  'use strict';
  root.QueueIndexItem = React.createClass({
    render: function () {
      var song = this.props.song
      return (<div><span>{song.title+ ": index " + this.props.idx}</span></div>);
    }
  });
}(this));
