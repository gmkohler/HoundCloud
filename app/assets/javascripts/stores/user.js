/* global EventEmitter */
/* global AppDispatcher */
/* global UserConstants */


(function(root) {
  'use strict';

  var _users = {};

  function addUserToStore (newUser) {
    _users[newUser.id] = newUser;
  }

  function addUsersToStore (newUsers) {
    newUsers.forEach(function (user) {
      addUserToStore(user);
    });
  }

  function resetUsers (newUsers) {
    _users = {};
    addUsersToStore(newUsers);
  }

  root.UserStore = $.extend({}, EventEmitter.prototype, {
      getAll: function (numUsers) {
        return this._values();
      },

      getUser: function (userID) {
        return _users[userID]
      },

      getCurrentUser: function () {
        return _users[window.CURRENT_USER_ID];
      },

      getFollowSuggestions: function (numUsers) {
        var numUsers = numUsers || 0;
        var candidates = this._values().filter(function(user){
          return !(user.isFollowed || user.id === CURRENT_USER_ID);
        });

        return candidates.slice(0, numUsers);
      },

      _values: function () {
        var keys = Object.keys(_users);
        if (keys) {
          return keys.map(function(key) {
            return _users[key];
          });
        } else {
          return [];
        }
      },

      getMatchingUsers: function(term, numResults){
        var users = this._values().filter(function(user){
          return !!user.username.match(term);
        });

        numResults = numResults || users.length;
        var results = users.slice(0, numResults);

        return results;
      },

      getUser: function (userID) {
        return (_users[userID.toString()]);
      },

      addChangeListener: function (callback) {
        this.on(UserConstants.USER_CHANGE_EVENT, callback);
      },

      removeChangeListener: function (callback) {
        this.removeListener(UserConstants.USER_CHANGE_EVENT, callback);
      },

      hasChanged: function () {
        this.emit(UserConstants.USER_CHANGE_EVENT);
      },

      dispatcherID: AppDispatcher.register(function(action){
        switch (action.actionType) {
          case UserConstants.SINGLE_USER_RECEIVED:
            addUserToStore(action.user);
            UserStore.hasChanged();
            break;
          case UserConstants.SUGGESTED_USERS_RECEIVED:
            addUsersToStore(action.users);
            UserStore.hasChanged();
            break;
          case UserConstants.FOLLOW_SUGGESTIONS_RECEIVED:
            addUsersToStore(action.users);
            UserStore.hasChanged();
            break;
        }
      })
  });
}(this));
