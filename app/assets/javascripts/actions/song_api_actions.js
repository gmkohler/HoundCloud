/* global SongConstants */
/* global AppDispatcher */

(function(root) {
  'use strict';

  root.SongApiActions = {
    receiveAllSongs: function (songs) {
    
      var action = {
        actionType: SongConstants.ALL_SONGS_RECEIVED,
        songs: songs
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));
