(function(root) {
  'use strict';
  root.SongComment = React.createClass({
    render: function () {
      var comments = this.props.comments;
      var headComment = comments[0];
      var percentElapsed = "" + (parseFloat(headComment.commentTime) * 100) + "%";
      var commentStyle = {
        position:"absolute",
        left: percentElapsed,
        top:"5px"
      };
      var thumbnailStyle = {
        height:"20px",
        width:"20px",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        backgroundImage: "url(" + headComment.author.imageUrl + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      };

      var commentBodies = comments.map(function(comment){
        return (
          <div className="comment-text">
            <span>
              <Link to={"users/" + comment.author.id} className="comment-username">
                {comment.author.username}
              </Link>
            </span>
            <span className="comment-body">{comment.body}</span>
          </div>
        );
      });

      return (
        <div className="song-comment"
             style={commentStyle}>
          <div className="comment-thumbnail"
               style={thumbnailStyle}>
          </div>
          <div className="comment-bodies clearfix">
            {commentBodies}
          </div>
        </div>
      );
    }
  });
}(this));
