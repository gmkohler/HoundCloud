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
      var thumbStyle = {
        backgroundImage: "url(" + song.image_url + ")",
        backgroundPosition: "center",

        height: "120px",
        width: "120px"
      };
      return (
        <div className="row">
          <div className="col-md-3" style={thumbStyle}></div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2">
                <button type="button"
                        className="btn btn-primary btn-circle btn-xl"
                        onClick={this._playNow}>
                  <i className="glyphicon glyphicon-play"></i>
                </button>
              </div>
              <div className="col-md-10">
                <div className="row">
                  <span>artist_name</span>
                </div>
                <div className="row">
                  <span>{song.title}</span>
                </div>
              </div>
            </div>

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
          </div>
        </div>

      );
    }
  });
}(this));
