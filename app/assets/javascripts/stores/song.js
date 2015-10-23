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

  function updateSingleSong(song) {
    var idx = _songs.indexOf(findSong(song.id));
    if (idx === -1) {
      return;
    } else {
      _songs[idx] = song;
    }
  }

  function queueSingleSong (songID) {
    var song = findSong(songID);
    _queue.push(song);
  }

  function spliceSingleSong (spliceIdx, deleteCount, songID) {
    if (songID) {
     var song = findSong(songID);
     _queue.splice(spliceIdx, deleteCount, song);
    } else {
      _queue.splice(spliceIdx, deleteCount);
    }
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

// FILTER FUNCTIONS
// ------------------------------------------------------
      getAll: function () {
        return _songs.slice(0);
      },

      getStream: function () {
        return _songs.filter(function(song){
          return song.isSubscribed;
        });
      },

      getByTitle: function (fragment) {
        return _songs.filter(function(song) {
          return (!!song.title.match(fragment) ||
                    !!song.artist_username.title.match(fragment));
        });
      },

      getTracks: function (userID) {
        return _songs.filter(function(song){
                 return song.artist_id === userID;
               });
      },

      getReposts: function (userID) {
        return _songs.filter(function(song){
                 return !!song.reposters[userID];
               });
      },

      getTracksAndReposts: function (userID) {
        return _songs.filter(function(song){
                 return song.artist_id === userID || !!song.reposters[userID];
               });
      },

// _SONGS METHODS
// ----------------------------------------------
      addChangeListener: function (callback) {
        this.on(SongConstants.SONGS_CHANGE_EVENT, callback);
      },

      removeChangeListener: function (callback) {
        this.removeListener(SongConstants.SONGS_CHANGE_EVENT, callback);
      },

      hasChanged: function () {
        this.emit(SongConstants.SONGS_CHANGE_EVENT);
      },

//   _QUEUE METHODS
//   ---------------------------------------

      getQueue: function () {
        return _queue.slice(0);
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
//   ---------------------------------------------------

      DispatcherID: AppDispatcher.register(function (payload) {
        switch (payload.actionType) {
          case SongConstants.SINGLE_SONG_RECEIVED:
            updateSingleSong(payload.song);
            SongStore.hasChanged();
            break;
          case SongConstants.ALL_SONGS_RECEIVED:
            resetSongs(payload.songs);
            SongStore.hasChanged();
            break;
          case SongConstants.SONGS_RECEIVED:
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
          case SongConstants.REMOVE_QUEUED_SONG:
            spliceSingleSong(payload.queueIdx, 1);
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
