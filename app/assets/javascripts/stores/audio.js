/* global AppDispatcher */
/* global EventEmitter */
/* global AudioConstants */
(function(root) {
  'use strict';

  var _params = {src: "", paused: true, currentTime: 0, duration: 0};

  function updateCurrentTime (time) {
    _params.currentTime = time;
  }

  function loadNewTrack (songParams) {
    _params.currentTime = songParams.currentTime;
    _params.duration = songParams.duration;
  }

  root.AudioStore = $.extend({}, EventEmitter.prototype, {
    getParams: function () {
      return _params;
    },
    addChangeListener: function (callback) {
      this.on(AudioConstants.AUDIO_CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(AudioConstants.AUDIO_CHANGE_EVENT, callback);
    },

    _hasChanged: function () {
      this.emit(AudioConstants.AUDIO_CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case AudioConstants.CURRENT_TIME_RECEIVED:
          updateCurrentTime(payload.currentTime);
          AudioStore._hasChanged();
          break;
        case AudioConstants.NEW_TRACK_RECEIVED:
          loadNewTrack(payload.songParams)
          AudioStore._hasChanged();
          break;
      }
      // need time change and track change.
      // Bonus, volume?
    })
  });
}(this));
