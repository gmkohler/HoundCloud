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

    fetchQueriedUsers: function (searchQuery) {
      var ajaxOptions = {
        url: '/api/users',
        type: 'GET',
        data: {search_query: searchQuery},
        dataType: 'json',
        success: SearchActions.receiveQueriedUsers
      };

      $.ajax(ajaxOptions);
    },

    fetchFollowSuggestions: function () {
      var ajaxOptions = {
        url: '/api/users/follow_suggestions',
        type: 'GET',
        dataType: 'json',
        success: UserApiActions.receiveFollowSuggestions
      };

      $.ajax(ajaxOptions);
    }

  };
}(this));
