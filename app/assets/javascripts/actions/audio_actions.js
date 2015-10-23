/* global AppDispatcher */
/* global AudioConstants */
(function(root) {
  'use strict';
  root.AudioActions = {
    receiveCurrentTime: function (data) {
      AppDispatcher.dispatch({
        actionType: AudioConstants.CURRENT_TIME_RECEIVED,
        currentTime: data
      });
    },

    receiveNewTrack: function (data) {
      AppDispatcher.dispatch({
        actionType: AudioConstants.NEW_TRACK_RECEIVED,
        songParams: data
      });
    },

    pauseSong: function () {
      AppDispatcher.dispatch({
        actionType: AudioConstants.PAUSE_SONG,
        data: {}
      });
    }
  };
}(this));
