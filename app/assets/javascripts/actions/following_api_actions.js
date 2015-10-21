/* global FollowingConstants */
/* global AppDispatcher */
(function(root) {
  'use strict';
  root.FollowingApiActions = {
    receiveFollowings: function (data) {
      var action = {
        actionType: FollowingConstants.FOLLOWINGS_RECEIVED,
        followings: data
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));
