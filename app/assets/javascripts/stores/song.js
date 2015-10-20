/* global EventEmitter */
/* global SongConstants */
/* global AppDispatcher */
/* global SongStore */
(function(root) {
  'use strict';
  var _songs = [];
  var _queue = [];

  function resetSongs (newSongs) {
    _songs = newSongs;
  }

  function findSong (songID) {
    return _songs.find(function (song) {
      return song.id === songID;
    });
  }

  function queueSingleSong (songID) {
    var song = findSong(songID);
    _queue.push(song);
  }

  function spliceSingleSong (spliceIdx, deleteCount, songID) {
    var song = findSong(songID);
    _queue.splice(spliceIdx, deleteCount, song);
    // debugger;
  }

  function transferSongsToQueue (startSongID) {
    var startSong   = findSong(startSongID),
        startIdx    = _songs.indexOf(startSong),
        queuedSongs = _songs.slice(startIdx, _songs.length);
    _queue = _queue.concat(queuedSongs);
  }

  function shiftQueue () {
    _queue.shift();
  }

  root.SongStore = $.extend({}, EventEmitter.prototype, {
      getAll: function () {
        return _songs.slice(0);
      },

      getSong: function (songID) {
        return findSong(songID);
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
          case SongConstants.SINGLE_QUEUED_SONG_RECEIVED:
            queueSingleSong(payload.songID);
            SongStore.queueHasChanged();
            break;
          case SongConstants.QUEUED_SONG_RECEIVED:
            transferSongsToQueue(payload.songID);
            SongStore.queueHasChanged();
            break;
          case SongConstants.PLAY_NOW_RECEIVED:
            spliceSingleSong(0, 1, payload.songID);
            SongStore.queueHasChanged();
            break;
          case SongConstants.PLAY_NEXT_RECEIVED:
            spliceSingleSong(1, 0, payload.songID);
            SongStore.queueHasChanged();
            break;
          case SongConstants.SHIFT_QUEUE:
            shiftQueue();
            SongStore.queueHasChanged();
            break;
        }
    })
  });
}(this));
