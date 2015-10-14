(function(root) {
  'use strict';
  root.ApiUtil = {
    logOut: function () {
      var ajaxOptions = {
        url: '/session',
        type: 'DELETE',
        dataType: 'json',
        success: function () {
          window.location = "/";
        }
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
    }
  };

}(this));
