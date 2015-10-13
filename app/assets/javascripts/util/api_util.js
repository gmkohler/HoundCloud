(function(root) {
  'use strict';
  root.ApiUtil = {
    logOut: function () {
      var ajaxOptions = {
        url: '/session',
        type: 'DELETE',
        dataType: 'json',
        success: function () {
          window.location="/";
        }
      };

      $.ajax(ajaxOptions);
    }
  };

}(this));
