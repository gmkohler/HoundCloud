/* global SearchConstants */
/* global AppDispatcher */
(function(root) {
  'use strict';
  root.SearchActions = {
    receiveQueriedUsers: function (data) {
      AppDispatcher.dispatch({
        actionType: SearchConstants.QUERIED_USERS_RECEIVED,
        users: data
      });
    },

    receiveQueriedSongs: function (data) {
      AppDispatcher.dispatch({
        actionType: SearchConstants.QUERIED_SONGS_RECEIVED,
        songs: data
      });
    },

    receiveFilters: function (data) {
      AppDispatcher.dispatch({
        actionType: SearchConstants.FILTERS_RECEIVED,
        filters: data
      });
    }

  };
}(this));
