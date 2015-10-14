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
    }
  };
}(this));
