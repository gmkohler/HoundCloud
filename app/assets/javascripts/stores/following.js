/* global EventEmitter */
(function(root) {
  'use strict';
  var _followings = {};
  function _keys () {
    return Object.keys(_followings);
  }

  function addFollowings (followings) {
    followings.forEach(function (following) {
      _followings
    });
  }

  root.FollowingStore = $.extend({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
      this.on(FollowingConstants.FOLLOWING_CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      this.removeListener(FollowingConstants.FOLLOWING_CHANGE_EVENT, callback);
    },
    hasChanged: function () {
      this.emit(FollowingConstants.FOLLOWING_CHANGE_EVENT);
    },

    getFolloweeCount: function (userID) {
      var count = 0;
      _keys.forEach(function (key) {
        if (_followings.key.follower_id === userID) {count += 1;}
      });
      return count;
    },
    getFollowerCount: function (userID) {
      var count = 0;
      _keys.forEach(function (key) {
        if (_followings.key.followee_id === userID) {count += 1;}
      });
      return count;
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case FollowingConstants.FOLLOWINGS_RECEIVED:

      }
    })

  });


}(this));
