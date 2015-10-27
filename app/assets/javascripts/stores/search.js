/* global AppDispatcher */
/* global EventEmitter */
/* global SearchConstants */

(function(root) {
  'use strict';

  var _results = {
    users: [],
    songs: [],
    tags: {},
  };

  var _filters = {
    showUsers: true,
    showSongs: true,
    tagID: null
  };

  function updateSongsAndTags (songs) {
    _results.songs = songs;
    _results.tags = {};
    songs.forEach(function(song) {
      song.tags.forEach(function(tag){
        _results.tags[tag.id] = tag.name;
      });
    });
  }

  function updateFilters(filters) {
    Object.keys(filters).forEach(function(key){
      _filters[key] = filters[key];
    });
  }

  function clearAll () {
    _results = {users: [], songs: [], tags: {}};
    _filters = {users: true, songs: true, tagID: null};
  }

  root.SearchStore = $.extend({}, EventEmitter.prototype, {
    getAll: function (query) {
      return {users: this.getUsers(query), songs: this.getSongs(query)};
    },

    getUsers: function (query) {
      var retVals = [];
      if (_filters.showUsers) {
        retVals = _results.users.filter(function(user) {
          return user.username.toLowerCase().match(query);
        });
      }

      return retVals;
    },


    getSongs: function (query) {
      if (_filters.showSongs) {
        if (_filters.tagID) {
          return _results.songs.filter(function(song){
            return song.tags.find(function(tag){
              return tag.id === _filters.tagID;
            });
          });
        } else {
          return _results.songs.filter(function(song) {
            debugger;
            return !!(song.title.toLowerCase().match(query) || song.artist_username.toLowerCase().match(query));
          });
        }
      } else {
        return [];
      }
    },

    // _values: function (obj) {
    //   var keys = Object.keys(obj);
    //   if (keys) {
    //     return keys.map(function(key) {
    //       return obj[key];
    //     });
    //   } else {
    //     return [];
    //   }
    // },

    getMatchingResults: function(term, numResults){
      var users = _results.users.filter(function(user){
        return !!user.username.toLowerCase().match(term);
      });

      var songs = _results.songs.filter(function(song){
        return (!!song.title.toLowerCase().match(term) || !!song.artist_username.toLowerCase().match(term));
      });

      var numUsers = numResults || users.length,
          numSongs = numResults || songs.length;
      var userResults = users.slice(0, numUsers);
      var songResults = songs.slice(0, numSongs);

      return {users: userResults, songs: songResults};
    },

    getTags: function () {
      return _results.tags;
    },

    getFilters: function (filter) {
      return filter ? _filters[filter] : _filters;
    },

    addResultsChangeListener: function (callback) {
      this.on(SearchConstants.RESULTS_CHANGE_EVENT, callback);
    },

    removeResultsChangeListener: function (callback) {
      this.removeListener(SearchConstants.RESULTS_CHANGE_EVENT, callback);
    },

    _resultsHaveChanged: function () {
      this.emit(SearchConstants.RESULTS_CHANGE_EVENT);
    },

    addFiltersChangeListener: function (callback) {
      this.on(SearchConstants.FILTERS_CHANGE_EVENT, callback);
    },

    removeFiltersChangeListener: function (callback) {
      this.removeListener(SearchConstants.FILTERS_CHANGE_EVENT, callback);
    },

    _filtersHaveChanged: function () {
      this.emit(SearchConstants.FILTERS_CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case SearchConstants.QUERIED_USERS_RECEIVED:
          _results.users = payload.users;
          SearchStore._resultsHaveChanged();
          break;
        case SearchConstants.QUERIED_SONGS_RECEIVED:
          updateSongsAndTags(payload.songs);
          SearchStore._resultsHaveChanged();
          break;
        case SearchConstants.FILTERS_RECEIVED:
          updateFilters(payload.filters);
          SearchStore._filtersHaveChanged();
          break;
      }
    })
  });
}(this));
