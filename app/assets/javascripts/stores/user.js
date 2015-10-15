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
      getAll: function () {
        return this._values();
      },

      _values: function (keys) {
        keys = keys || _users.keys;
        return keys.map(function(key) {
          return _users[key];
        });
      },

      getMatchingUsers: function(term, numResults){
        var users = this._values();
        users.filter(function(user){
          return !!user.username.match(term);
        });
        
        numResults = numResults || users.length;
        var results = users.slice(0, numResults);

        return results;
      },

      getUser: function (userID) {
        return _users[userID.toString()];
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
          case UserConstants.QUERIED_USERS_RECEIVED:
            addUsersToStore(action.users);
            UserStore.hasChanged();
            break;
        }
      })
  });
}(this));
