/* global React */
(function(root) {
  'use strict';
  root.AudioPlayer = React.createClass({
    getInitialState: function () {
      return {queue: []};
    },

    componentDidMount: function () {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      SongStore.addQueueChangeListener(this._queueChange);
    },

    _queueChange: function () {
      this.setState({queue: SongStore.getQueue()});
      debugger;
    },

    render: function () {
      var buttons = (
        [<button type="button" className="btn btn-primary btn-default">
          <i className="glyphicon glyphicon-step-backward"></i>
        </button>,
        <button type="button" className="btn btn-primary btn-default">
          <i className="glyphicon glyphicon-play"></i>
        </button>,
        <button type="button" className="btn btn-primary btn-default">
          <i className="glyphicon glyphicon-step-forward"></i>
        </button>]
      );

      return (<div>{buttons}</div>);
    }
  });

}(this));
