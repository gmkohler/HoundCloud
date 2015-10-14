/* global UserApiActions */

(function(root) {
  'use strict';
  root.UserApiUtil = {
    fetchSingleUser: function (userID) {
      var ajaxOptions = {
        url: '/api/users/' + userID,
        type: 'GET',
        dataType: 'json',
        success: UserApiActions.receiveSingleUser
      };

      $.ajax(ajaxOptions);
    }
  };
}(this));
