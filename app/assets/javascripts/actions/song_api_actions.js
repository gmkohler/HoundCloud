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

    receiveSongs: function (data) {
      var action = {
        actionType: SongConstants.SONGS_RECEIVED,
        songs: data
      };

      AppDispatcher.dispatch(action);
    },
    
    receiveQueriedSongs: function (data) {
      var action = {
        actionType: SearchConstants.QUERIED_SONGS_RECEIVED,
        songs: data
      };

      AppDispatcher.dispatch(action);
    },

    receiveSingleSong: function (data) {
      var action = {
        actionType: SongConstants.SINGLE_SONG_RECEIVED,
        song: data
      };

      AppDispatcher.dispatch(action);
    },

    receivePlayNow: function (id) {
      var action = {
        actionType: SongConstants.PLAY_NOW_RECEIVED,
        songID: id
      };

      AppDispatcher.dispatch(action);
    },

    receivePlayNext: function (id) {
      var action = {
        actionType: SongConstants.PLAY_NEXT_RECEIVED,
        songID: id
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

    receiveSingleQueuedSong: function (id) {
      var action = {
        actionType: SongConstants.SINGLE_QUEUED_SONG_RECEIVED,
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
