(function(root) {
  'use strict';
  root.SongSuggestionIndexItem = React.createClass({
    render: function () {
      var song = this.props.song;
      return (
        <li>
          <div>
            <span>{song.username}</span>
            <i className="glyphicon glyphicon-play"/>
            <i className="glyphicon glyphicon-plus"/>
            <i className="glyphicon glyphicon-arrow-right"/>
          </div>
        </li>
      );
    }
  });

}(this));
