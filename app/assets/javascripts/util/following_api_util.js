/* global UserApiActions */
/* global FollowingApiActions */
(function(root) {
  'use strict';
  root.FollowingApiUtil = {
    addFollowing: function (followeeID) {
      var ajaxOptions = {
        url: '/api/users/' + followeeID + '/following',
        type: 'POST',
        dataType: 'json',
        success: UserApiActions.receiveSingleUser
      };

      $.ajax(ajaxOptions);
    },

    removeFollowing: function (followeeID) {
      var ajaxOptions = {
        url: '/api/users/' + followeeID + '/following',
        type: 'DELETE',
        dataType: 'json',
        success: UserApiActions.receiveSingleUser
      };

      $.ajax(ajaxOptions);
    },

  };
}(this));
