/* global TagApiUtil */
/* global TagApiActions */

(function(root) {
  'use strict';
  root.TagApiUtil = {
    // postTag: function (tagName) {
    //   var ajaxOptions = {
    //     url: '/api/tags',
    //     type: 'POST',
    //     data: {tag: {name: tagName}},
    //     success: TagApiActions.receiveSingleTag
    //   };
    //
    //   $.ajax(ajaxOptions);
    // },

    // fetchSingleTag: function (tagName) {
    //   var ajaxOptions = {
    //     url: '/api/tags',
    //     data: {tag: {name: tagName}},
    //     type: 'GET',
    //     dataType: 'json',
    //     success: TagApiActions.receiveSingleTag,
    //     error: TagApiUtil.postTag.bind(null, tagName)
    //   };
    //
    //   $.ajax(ajaxOptions);
    // },

    fetchAllTags: function () {},

    fetchTagsBySong: function (songID) {}
  };
}(this));
