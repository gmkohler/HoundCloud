/* global React */
(function(root) {
  'use strict';
  root.AudioElement = React.createClass({
    render: function () {
      return (
        <audio src={this.props.song_url}></audio>
      );
    }
  });
}(this));
