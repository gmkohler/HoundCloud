/* global SongConstants */
/* global AppDispatcher */

(function(root) {
  'use strict';

  root.SongApiActions = {
    receiveAllSongs: function (data) {
      AppDispatcher.dispatch({
        actionType: SongConstants.ALL_SONGS_RECEIVED,
        songs: data
      });
    },

    receiveSongs: function (data) {
      AppDispatcher.dispatch({
        actionType: SongConstants.SONGS_RECEIVED,
        songs: data
      });
    },

    receiveLikedSongs: function (data) {
      AppDispatcher.dispatch({
        actionType: SongConstants.LIKED_SONGS_RECEIVED,
        songs: data
      });
    },

    receiveSingleSong: function (data) {
      AppDispatcher.dispatch({
        actionType: SongConstants.SINGLE_SONG_RECEIVED,
        song: data
      });
    },

    receivePlayNow: function (id) {
      AppDispatcher.dispatch({
        actionType: SongConstants.PLAY_NOW_RECEIVED,
        songID: id
      });
    },

    receivePlayNext: function (id) {
      AppDispatcher.dispatch({
        actionType: SongConstants.PLAY_NEXT_RECEIVED,
        songID: id
      });
    },

    removeSongFromQueue: function (idx) {
      AppDispatcher.dispatch({
        actionType: SongConstants.REMOVE_QUEUED_SONG,
        queueIdx: idx
      });
    },

    moveQueuedSongForward: function (idx) {
      AppDispatcher.dispatch({
        actionType: SongConstants.MOVE_QUEUED_SONG_FORWARD,
        queueIdx: idx
      });
    },

    moveQueuedSongBackward: function (idx) {
      AppDispatcher.dispatch({
        actionType: SongConstants.MOVE_QUEUED_SONG_BACKWARD,
        queueIdx: idx
      });
    },

    receiveQueuedSong: function (id) {
      AppDispatcher.dispatch({
        actionType: SongConstants.QUEUED_SONG_RECEIVED,
        songID: id
      });
    },

    receiveSingleQueuedSong: function (id) {
      AppDispatcher.dispatch({
        actionType: SongConstants.SINGLE_QUEUED_SONG_RECEIVED,
        songID: id
      });
    },

    shiftQueueForward: function () {
      AppDispatcher.dispatch({
        actionType: SongConstants.SHIFT_QUEUE,
        data: null
      });
    }
  };
}(this));
