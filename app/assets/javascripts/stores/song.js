/* global EventEmitter */
/* global SongConstants */
/* global SearchConstants */
/* global AppDispatcher */
/* global SongStore */
(function(root) {
  'use strict';
  var _feed = [];
  var _queue = [];
  var _likes = [];

  var queueID = 0;

  function resetSongs (newSongs) {
    _feed = newSongs;
  }

  function resetLikedSongs (newSongs) {
    // songs jbuilder includes `isLiked` but it's w/ reference to current user.
    // need to implement a better add to queue method, but for now,
    // findSong wil search _likes for the song if it's not found in _feed
    //
    // Realistically, the queue should move to its own store and
    // be able to receive play requests from a number of origins (e.g., feed, search, likes)
    _likes = newSongs;
  }

  function findSong (songID) {
    // need to fix to allow for adding likes.
    // more reasonably, we should just fix
    var findBySongId = function (song) {return song.id === songID;},
        foundSong = _feed.find(findBySongId);

    if (!foundSong) {
      foundSong = _likes.find(findBySongId);
    }
    return foundSong;
  }

  function addSingleSong(song) {
    var idx = _feed.indexOf(findSong(song.id));
    if (idx === -1) {
      _feed.push(song);
    } else {
      _feed[idx] = song;
    }
  }

  function queueSingleSong (songID) {
    var song = findSong(songID);
    var qSong = $.extend({queueID: queueID}, song);
    queueID++;
    _queue.push(song);
  }

  function spliceSingleSong (spliceIdx, deleteCount, songID) {
    if (songID) {
     var song = findSong(songID);
     var qSong = $.extend({queueID: queueID}, song);
     queueID++;
     _queue.splice(spliceIdx, deleteCount, qSong);
    } else {
      _queue.splice(spliceIdx, deleteCount);
    }
  }

  function moveQueuedSong (idx, dir) {
    var temp = _queue[idx];
    _queue[idx] = _queue[idx + dir];
    _queue[idx + dir] = temp;
  }

  // Once implemented, need to refactor to include queueID.
  // Note that it deals with songs whereas queueSingleSong uses songID.
  //
  // function transferSongsToQueue (startSongID) {
  //   var startSong   = findSong(startSongID),
  //       startIdx    = _feed.indexOf(startSong),
  //       queuedSongs = _feed.slice(startIdx, _feed.length);
  //   _queue = _queue.concat(queuedSongs);
  // }

  function shiftQueue () {
    _queue.shift();
  }

  root.SongStore = $.extend({}, EventEmitter.prototype, {

// FILTER FUNCTIONS
// ------------------------------------------------------
      getAll: function () {
        return _feed.slice(0);
      },

      getStream: function () {
        return _feed.filter(function(song){
          return song.isSubscribed;
        });
      },

      getByTitle: function (fragment) {
        return _feed.filter(function(song) {
          return (!!song.title.toLowerCase().match(fragment) ||
                    !!song.artist_username.toLowerCase().match(fragment));
        });
      },

      getTracks: function (userId) {
        return _feed.filter(function(song){
                 return song.artist_id === userId;
               });
      },

      getReposts: function (userId) {
        return _feed.filter(function(song){
                 return !!song.reposters[userId];
               });
      },

      getLikes: function (numSongs) {
        // need to refactor how "songs"  are treated before putting
        // liked songs in the same collections.  Once done, use:
        // var likedSongs = _feed.filter(function(song) {
        //         return song.isLiked;
        //     });
        if (!!numSongs || numSongs > _likes.length) {
          numSongs = likedSongs.length;
        }
        return _likes.slice(0, numSongs);
      },

      getTracksAndReposts: function (userId) {
        return _feed.filter(function(song){
            return song.artist_id === userId || !!song.reposters[userId];
        });
      },

// _FEED METHODS
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
      
// _LIKES METHODS
// ----------------------------------------------
      addLikesChangeListener: function (callback) {
        this.on(SongConstants.LIKES_CHANGE_EVENT, callback);
      },

      removeLikesChangeListener: function (callback) {
        this.removeListener(SongConstants.LIKES_CHANGE_EVENT, callback);
      },

      likesHasChanged: function () {
        this.emit(SongConstants.LIKES_CHANGE_EVENT);
      },

//   _QUEUE METHODS
//   ---------------------------------------

      getQueue: function () {
        return _queue.slice(0);
      },

      getCurrentSongID: function () {
        return _queue[0] ? _queue[0].id : 0;
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
            addSingleSong(payload.song);
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
          case SongConstants.LIKED_SONGS_RECEIVED:
            resetLikedSongs(payload.songs);
            SongStore.likesHasChanged();
            break;
          case SearchConstants.QUERIED_SONGS_RECEIVED:
            resetSongs(payload.songs);
            break;
          case SongConstants.SINGLE_QUEUED_SONG_RECEIVED:
            queueSingleSong(payload.songID);
            SongStore.queueHasChanged();
            break;
          case SongConstants.QUEUED_SONG_RECEIVED:
            queueSingleSong(payload.songID);
            SongStore.queueHasChanged();
            break;
          case SongConstants.REMOVE_QUEUED_SONG:
            spliceSingleSong(payload.queueIdx, 1);
            SongStore.queueHasChanged();
            break;
          case SongConstants.MOVE_QUEUED_SONG_FORWARD:
            moveQueuedSong(payload.queueIdx, -1);
            SongStore.queueHasChanged();
            break;
          case SongConstants.MOVE_QUEUED_SONG_BACKWARD:
            moveQueuedSong(payload.queueIdx, 1);
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
  root.SongStore.setMaxListeners(0);
}(this));
