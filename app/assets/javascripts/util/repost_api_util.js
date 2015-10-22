/* global SongApiActions */
(function(root) {
  'use strict';
  root.RepostApiUtil = {
    addSongRepost: function (songID) {
      var ajaxOptions = {
        url: '/api/songs/' + songID + '/repost',
        type: 'POST',
        data: {type: 'Song'},
        dataType: 'json',
        success: SongApiActions.receiveSingleSong
      };

      $.ajax(ajaxOptions);
    },

    removeSongRepost: function (songID) {
      var ajaxOptions = {
        url: '/api/songs/' + songID + '/repost',
        type: 'DELETE',
        data: {type: 'Song'},
        dataType: 'json',
        success: SongApiActions.receiveSingleSong
      };

      $.ajax(ajaxOptions);
    }
  };
}(this));
