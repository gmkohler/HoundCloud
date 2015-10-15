/* global React */
(function(root) {
  'use strict';
  root.AudioSource = React.createClass({
    render: function () {
      return (
        <audio>
          <source src={this.song_url}/>
        </audio>
      );
    }
  });
}(this));
