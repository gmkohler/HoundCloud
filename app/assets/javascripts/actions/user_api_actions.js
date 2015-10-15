/* global UserConstants */
/* global AppDispatcher */

(function(root) {
  'use strict';
  root.UserApiActions = {
    receiveSingleUser: function (data) {
      var action = {
        actionType: UserConstants.SINGLE_USER_RECEIVED,
        user: data
      };

      AppDispatcher.dispatch(action);
    },

    receiveQueriedUsers: function (data) {
      var action = {
        actionType: UserConstants.QUERIED_USERS_RECEIVED,
        users: data
      };

      AppDispatcher.dispatch(action);
    },

    receiveSuggestedUsers: function (data) {
      var action = {
        actionType: UserConstants.SUGGESTED_USERS_RECEIVED,
        users: data
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));
