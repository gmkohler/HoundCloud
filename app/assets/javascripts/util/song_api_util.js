/* global SongApiActions */

(function(root) {
  'use strict';

  // perhaps "everything *or* whatever is in the query string"

  root.SongApiUtil = {
    fetchAllSongs: function () {
      var ajaxOptions = {
        url: '/api/songs',
        type: 'GET',
        dataType: 'json',
        success: SongApiActions.receiveAllSongs
      };

      $.ajax(ajaxOptions);
    },

    fetchSongsByContext: function (context, data) {

      var ajaxOptions = {
        url: '/api/songs',
        type: 'GET',
        data: {context: context, data: data},
        success: SongApiActions.receiveSongs
      };

      $.ajax(ajaxOptions);
    },

    postSong: function (songParams, successCallback) {
      var ajaxOptions = {
        url: '/api/songs',
        type: 'POST',
        data: {song: songParams},
        success: successCallback
      };

      $.ajax(ajaxOptions);
    },

    updateSong: function (songID, songParams, successCallback) {
      var ajaxOptions = {
        url: '/api/songs/' + songID,
        type: 'PATCH',
        data: {song: songParams},
        success: successCallback
      };

      $.ajax(ajaxOptions);
    }
  };
}(this));
