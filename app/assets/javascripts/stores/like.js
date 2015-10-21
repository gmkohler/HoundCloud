/* global EventEmitter */

(function(root) {
  'use strict';
  var _likes = {};
  function _keys () {
    return Object.keys(_likes);
  }
  root.LikeStore = $.extend({}, EventEmitter.prototype, {

    numLikes: function (type, ID) {
      var count = 0;
      _keys().forEach(function(key){
        if (_likes[key].likeable.type === type && _likes[key].likeable.id === ID) {
          count += 1;
        }
      });

      return count;
    }


  });
}(this));
