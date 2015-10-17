/* global React */
/* global AudioSource */
(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({

    componentDidMount: function () {},

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
        <div>
          <img src={song.image_url}
               height="60px"
               width="60px"/>
          <button type="button"
                  className="btn btn-primary btn-circle btn-xl"
                  onClick={this._playNow}>
            <i className="glyphicon glyphicon-play"></i>
          </button>
          <button type="button"
                  className="btn btn-primary btn-circle btn-md"
                  onClick={this._queueSong}>
            <i className="glyphicon glyphicon-plus"></i>
          </button>
          <button type="button"
                  className="btn btn-primary btn-circle btn-md"
                  onClick={this._playNext}>
            <i className="glyphicon glyphicon-arrow-right"></i>
          </button>
          <span>{song.title}</span>
        </div>
      );
    }
  });
}(this));
