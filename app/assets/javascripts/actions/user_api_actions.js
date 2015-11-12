/* global UserConstants */
/* global AppDispatcher */

(function(root) {
  'use strict';
  root.UserApiActions = {
    receiveSingleUser: function (data) {
      AppDispatcher.dispatch({
        actionType: UserConstants.SINGLE_USER_RECEIVED,
        user: data
      });
    },

    receiveSuggestedUsers: function (data) {
      AppDispatcher.dispatch({
        actionType: UserConstants.SUGGESTED_USERS_RECEIVED,
        users: data
      });
    },

    receiveFollowSuggestions: function (data) {
      AppDispatcher.dispatch({
        actionType: UserConstants.FOLLOW_SUGGESTIONS_RECEIVED,
        users: data
      });
    }
  };
}(this));
