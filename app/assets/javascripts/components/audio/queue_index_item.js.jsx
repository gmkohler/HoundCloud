/* global React */
(function(root) {
  'use strict';
  root.QueueIndexItem = React.createClass({
    render: function () {
      return (
        <audio>
          <source src={this.song_url}/>
        </audio>
      );
    }
  });
}(this));
