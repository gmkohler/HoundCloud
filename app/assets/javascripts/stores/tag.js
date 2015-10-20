/* global EventEmitter */
/* global AppDispatcher */
/* global TagConstants */
(function(root) {
  'use strict';
  var _tags = {};

  function addSingleTag (tag) {
    _tags[tag.name] = tag;
  }

  function addTags (tags) {
    tags.forEach(function (tag) {
      addSingleTag(tag);
    });
  }

  root.TagStore = $.extend({}, EventEmitter.prototype, {
    getAll: function () {
      return this._values();
    },

    _values: function () {
      var keys = Object.keys(_tags);
      if (keys) {
        return keys.map(function(key) {
          return _tags[key];
        });
      } else {
        return [];
      }
    },

    addChangeListener: function (callback) {
      this.on(TagConstants.TAGS_CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(TagConstants.TAGS_CHANGE_EVENT, callback);
    },

    hasChanged: function () {
      this.emit(TagConstants.TAGS_CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function(action){
      switch (action.actionType) {
        case TagConstants.SINGLE_TAG_RECEIVED:
          addSingleTag(action.tag);
          TagStore.hasChanged();
          break;
        case TagConstants.TAGS_RECEIVED:
          addTags(action.tags);
          TagStore.hasChanged();
          break;
      }
    })
  });
}(this));
