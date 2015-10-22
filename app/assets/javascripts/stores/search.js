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
    users: true,
    songs: true,
    tag: null
  };

  function updateSongsAndTags (songs) {
    _results.songs = songs;
    _results.tags = {};
    songs.forEach(function(song) {
      songs.tags.forEach(function(tag){
        _results.tags[tag.id] = tag.name;
      });
    });
  }

  function updateFilters(filters) {
    Object.keys(filters).forEach(function(key){
      _filters.key = filters.key;
    });
  }

  function clearAll () {
    _results = {users: [], songs: [], tags: {}};
    _filters = {users: true, songs: true, tag: null};
  }

  root.SearchStore = $.extend({}, EventEmitter.prototype, {
    getAll: function () {
      return {users: this.getUsers(), songs: this.getSongs()};
    },

    getUsers: function () {
      return _results.users.slice(0);
    },

    // consider returning nothing if !_filters.song.
    getSongs: function () {
      if (_filters.tag) {
        return _results.songs.filter(function(song){
          song.tags.find(function(tag){
            tag.id === _filters.tag;
          });
        });
      } else {
        return _results.songs.slice(0);
      }
    },

    getTags: function () {
      return _results.tags;
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