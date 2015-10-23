/* global SongApiUtil */
(function(root) {
  'use strict';
  root.CommentsApiUtil = {
    addSongComment: function (songID, body, commentTime) {
      debugger;
      var ajaxOptions = {
        url: '/api/songs/' + songID + '/comments',
        type: 'POST',
        data: {comment: {
                 commentable_id: songID,
                 commentable_type: 'Song',
                 body: body,
                 comment_time: commentTime
               }},
        success: SongApiUtil.receiveSingleSong
      };
    }
  };

}(this));
