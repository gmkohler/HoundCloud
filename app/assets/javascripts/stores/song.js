/* global EventEmitter */
/* global SongConstants */
/* global AppDispatcher */
(function(root) {
  'use strict';
  var _songs = [];
  var _queue = [];

  function resetSongs (newSongs) {
    _songs = newSongs;
  }

  function transferSongToQueue (songID) {
    var song  = _songs.find(function (song) {
      return song.id === songID;
    });

    addToQueue(song);
  }

  function addToQueue (queuedSong) {
    _queue.push(queuedSong);
  }

  root.SongStore = $.extend({}, EventEmitter.prototype, {
    getAll: function () {
      return _songs.slice(0);
    },

    getQueue: function () {
      return _queue.slice(0);
    },

    addChangeListener: function (callback) {
      this.on(SongConstants.SONGS_CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(SongConstants.SONGS_CHANGE_EVENT, callback);
    },

    hasChanged: function () {
      this.emit(SongConstants.SONGS_CHANGE_EVENT);
    },

    addQueueChangeListener: function (callback) {
      this.on(SongConstants.QUEUE_CHANGE_EVENT, callback);
    },

    removeQueueChangeListener: function (callback) {
      this.removeListener(SongConstants.QUEUE_CHANGE_EVENT, callback);
    },

    queueHasChanged: function () {
      this.emit(SongConstants.QUEUE_CHANGE_EVENT);
    },

    DispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SongConstants.ALL_SONGS_RECEIVED:
          resetSongs(payload.songs);
          SongStore.hasChanged();
          break;
        case SongConstants.USER_SONGS_RECEIVED:
          resetSongs(payload.songs);
          SongStore.hasChanged();
          break;
        case SongConstants.QUEUED_SONG_RECEIVED:
          transferSongToQueue(payload.songID);
          SongStore.queueHasChanged();
          break;
      }
    })
  });
}(this));
