(function(root) {
  'use strict';
  root.SongSuggestionIndexItem = React.createClass({
    _queueSong: function () {
      SongApiActions.receiveQueuedSong(this.props.song.id);
    },

    _playNext: function () {
      SongApiActions.receivePlayNext(this.props.song.id);
    },

    _playNow: function () {
      SongApiActions.receivePlayNow(this.props.song.id);
    },

    render: function () {
      var song = this.props.song;
      return (
        <li>
          <div>
            <span>{song.title}</span>
            <i className="glyphicon glyphicon-play"
               onClick={this._playNow}/>
            <i className="glyphicon glyphicon-plus"
               onClick={this._queueSong}/>
            <i className="glyphicon glyphicon-arrow-right"
               onClick={this._playNext}/>
          </div>
        </li>
      );
    }
  });

}(this));
