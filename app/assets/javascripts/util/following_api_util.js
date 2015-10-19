(function(root) {
  'use strict';
  root.FollowingApiUtil = {
    addFollowing: function (followeeID) {
      var ajaxOptions = {
        url: '/api/followings/',
        type: 'POST',
        data: {followee_id: followeeID},
        dataType: 'json',
        success: UserApiActions.receiveSingleUser
      };

      $.ajax(ajaxOptions);
    },

    removeFollowing: function (followingID) {
      var ajaxOptions = {
        url: '/api/followings/' + followingID,
        type: 'DELETE',
        dataType: 'json',
        success: UserApiActions.receiveSingleUser
      };

      $.ajax(ajaxOptions);
    }
  };
}(this));
