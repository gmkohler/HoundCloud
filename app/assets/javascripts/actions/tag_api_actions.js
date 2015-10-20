/* global AppDispatcher */
/* global TagConstants */

(function(root) {
  'use strict';
  root.TagApiActions = {
    receiveSingleTag: function (data) {
      AppDispatcher.dispatch({
        actionType: TagConstants.SINGLE_TAG_RECEIVED,
        tag: data
      });
    },

    receiveTags: function (data) {
      AppDispatcher.dispatch({
        actionType: TagConstants.TAGS_RECEIVED,
        tags: data
      });
    }
  };
}(this));
