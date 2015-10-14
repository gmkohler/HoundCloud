/* global EventEmitter */
/* global SongConstants */
/* global AppDispatcher */
(function(root) {
  'use strict';
  var _songs = [];

  function resetSongs (newSongs) {
    _songs = newSongs;
  }

  root.SongStore = $.extend({}, EventEmitter.prototype, {
    getAll: function () {
      return _songs.slice(0);
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

    DispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SongConstants.ALL_SONGS_RECEIVED:
          resetSongs(payload.songs);
          SongStore.hasChanged();
          break;
      }
    })
  });
}(this));
