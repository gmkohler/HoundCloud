/* global EventEmitter */
/* global AppDispatcher */
/* global UserConstants */


(function(root) {
  'use strict';
  var _users = [];

  function addUserToStore (newUser) {
    _users.push(newUser);
  }

  function addUsersToStore (newUsers) {
    newUsers.forEach(function (user) {
      addUserToStore(user);
    });
  }

  function resetUsers (newUsers) {
    _users = newUsers;
  }

  root.UserStore = $.extend({}, EventEmitter.prototype, {
      getAll: function () {
        return _users.slice(0);
      },

      getUser: function (userID) {
        var user = _users.find(function(user){
          return user.id === userID;
        });

        return user;
      },

      addChangeListener: function (callback) {
        this.on(UserConstants.USER_CHANGE_EVENT, callback);
      },

      addResultsChangeListener: function (callback) {
        this.on(UserConstants.USER_RESULTS_CHANGE_EVENT, callback);
      },

      addSuggestionsChangeListener: function (callback) {
        this.on(UserConstants.USER_SUGGESTIONS_CHANGE_EVENT, callback);
      },

      removeChangeListener: function (callback) {
        this.removeListener(UserConstants.USER_CHANGE_EVENT, callback);
      },

      removeResultsChangeListener: function (callback) {
        this.removeListener(
          UserConstants.USER_RESULTS_CHANGE_EVENT,
          callback
        );
      },

      removeSuggestionsChangeListener: function (callback) {
        this.removeListener(
          UserConstants.USER_SUGGESTIONS_CHANGE_EVENT,
          callback
        );
      },

      hasChanged: function () {
        this.emit(UserConstants.USER_CHANGE_EVENT);
      },

      suggestionHasChanged: function () {
        this.emit(UserConstants.USER_SUGGESTIONS_CHANGE_EVENT);
      },

      resultHasChanged: function () {
        this.emit(UserConstants.USER_RESULTS_CHANGE_EVENT);
      },

      dispatcherID: AppDispatcher.register(function(action){
        switch (action.actionType) {
          case UserConstants.SINGLE_USER_RECEIVED:
            addUserToStore(action.user);
            UserStore.hasChanged();
            break;
          case UserConstants.QUERIED_USERS_RECEIVED:
            resetUsers(action.users);
            UserStore.resultHasChanged();
            break;
          case UserConstants.SUGGESTED_USERS_RECEIVED:
            resetUsers(action.users);
            UserStore.suggestionHasChanged();
            break;
        }
      })
  });
}(this));
