/* global React */
/* global AudioSource */
(function(root) {
  'use strict';
  root.FeedIndexItem = React.createClass({

    componentDidMount: function () {
      // debugger;

    },



    _queueSong: function () {
      SongApiActions.receiveQueuedSong(this.props.song.id);
    },

    render: function () {
      var song = this.props.song;

      // need: <audio src={song.content_url} id="audio"></audio>
      return (
        <div>
          <img src={song.image_url}
               height="60px"
               width="60px"/>
          <button type="button"
                  className="btn btn-primary btn-circle btn-xl"
                  onClick={this._queueSong}>
            <i className="glyphicon glyphicon-play"></i>
          </button>
          <span>{song.title}</span>


        </div>
      );
    }
  });
}(this));
