/* global SearchConstants */
/* global AppDispatcher */
(function(root) {
  'use strict';
  root.SearchActions = {
    receiveQueriedUsers: function (data) {
      var action = {
        actionType: SearchConstants.QUERIED_USERS_RECEIVED,
        users: data
      };

      AppDispatcher.dispatch(action);
    },

    receiveQueriedSongs: function (data) {
      var action = {
        actionType: SearchConstants.QUERIED_SONGS_RECEIVED,
        songs: data
      };

      AppDispatcher.dispatch(action);
    }

  };
}(this));
