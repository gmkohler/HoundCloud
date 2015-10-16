/* global SongConstants */
/* global AppDispatcher */

(function(root) {
  'use strict';

  root.SongApiActions = {
    receiveAllSongs: function (data) {
      var action = {
        actionType: SongConstants.ALL_SONGS_RECEIVED,
        songs: data
      };

      AppDispatcher.dispatch(action);
    },

    receiveUserSongs: function (data) {
      var action = {
        actionType: SongConstants.USER_SONGS_RECEIVED,
        songs: data
      };

      AppDispatcher.dispatch(action);
    },

    receiveQueuedSong: function (id) {
      var action = {
        actionType: SongConstants.QUEUED_SONG_RECEIVED,
        songID: id
      };

      AppDispatcher.dispatch(action);
    },

    shiftQueueForward: function () {
      var action = {
        actionType: SongConstants.SHIFT_QUEUE,
        data: null
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));
