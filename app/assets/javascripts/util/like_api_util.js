/* global SongApiActions */

(function(root) {
  'use strict';

  root.LikeApiUtil = {
    addSongLike: function (songID) {
      var ajaxOptions = {
        url: '/api/songs/' + songID + '/like',
        type: 'POST',
        data: {type: "Song"},
        dataType: 'json',
        success: SongApiActions.receiveSingleSong
      };

      $.ajax(ajaxOptions);
    },

    removeSongLike: function (songID) {
      var ajaxOptions = {
        url: '/api/songs/' + songID + '/like',
        type: 'DELETE',
        data: {type: 'Song'},
        dataType: 'json',
        success: SongApiActions.receiveSingleSong
      };

      $.ajax(ajaxOptions);
    },
  };
}(this));
