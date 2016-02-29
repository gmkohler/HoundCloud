/* global SongApiUtil */
(function(root) {
  'use strict';
  root.CommentsApiUtil = {
    addSongComment: function (songID, body, commentTime) {
      var ajaxOptions = {
        url: '/api/songs/' + songID + '/comments',
        type: 'POST',
        data: {comment: {
                 commentable_id: songID,
                 commentable_type: 'Song',
                 body: body,
                 comment_time: commentTime
               }},
        success: SongApiActions.receiveSingleSong,
        error: function (data) {
        }
      };
      $.ajax(ajaxOptions);
    }
  };

}(this));
