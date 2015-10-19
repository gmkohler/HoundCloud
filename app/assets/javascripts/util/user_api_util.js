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
    },

    fetchQueriedUsers: function (searchQuery, successCallback) {
      successCallback = successCallback || UserApiActions.receiveQueriedUsers;

      var ajaxOptions = {
        url: '/api/users/',
        type: 'GET',
        data: {search_query: searchQuery},
        dataType: 'json',
        success: successCallback
      };

      $.ajax(ajaxOptions);
    },

  };
}(this));
