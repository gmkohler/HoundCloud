/* global AppDispatcher */
/* global AudioStore */
/* global EventEmitter */
/* global AudioConstants */
(function(root) {
  'use strict';

  var _params = {src: "", paused: true, currentTime: 0, duration: 0};

  function updateCurrentTime (time) {
    _params.currentTime = time;
  }

  function togglePlay () {
    _params.paused = !_params.paused;
  }

  function updateDuration (duration) {
    _params.duration = duration;
  }

  function loadNewTrack (songParams) {
    var wasEmpty = !_params.src;
    var isNowEmpty = !songParams.content_url;
    _params.src = songParams.content_url;
    _params.currentTime = 0;
    if (wasEmpty) { _params.paused = false; }
    if (isNowEmpty) { _params.paused = true;  }
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
    addTrackChangeListener: function (callback) {
      this.on(AudioConstants.AUDIO_TRACK_CHANGE_EVENT, callback);
    },

    removeTrackChangeListener: function (callback) {
      this.removeListener(AudioConstants.AUDIO_TRACK_CHANGE_EVENT, callback);
    },

    _trackHasChanged: function () {
      this.emit(AudioConstants.AUDIO_TRACK_CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case AudioConstants.CURRENT_TIME_RECEIVED:
          updateCurrentTime(payload.currentTime);
          AudioStore._hasChanged();
          break;
        case AudioConstants.NEW_TRACK_RECEIVED:
          loadNewTrack(payload.songParams);
          AudioStore._trackHasChanged();
          break;
        case AudioConstants.METADATA_RECEIVED:
          updateDuration(payload.metadata.duration);
          AudioStore._hasChanged();
          break;
        case AudioConstants.RESET_SONG:
          updateCurrentTime(0);
          AudioStore._hasChanged();
          break;
        case AudioConstants.TOGGLE_PLAY:
          togglePlay();
          AudioStore._hasChanged();
          break;
      }
      // need time change and track change.
      // Bonus, volume?
    })
  });
}(this));
