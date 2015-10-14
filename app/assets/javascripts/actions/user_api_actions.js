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
    }
  };
}(this));
