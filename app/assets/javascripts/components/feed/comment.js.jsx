(function(root) {
  'use strict';
  root.SongComment = React.createClass({
    render: function () {
      var comment = this.props.comment;
      var percentElapsed = "" + (parseFloat(comment.commentTime) * 100) + "%";
      var commentStyle = {
        position:"absolute",
        left: percentElapsed,
        top:"5px"
      };
      var thumbnailStyle = {
        height:"20px",
        width:"20px",
        backgroundImage: "url(" + comment.author.imageUrl + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      };

      return (
        <div className="song-comment"
             style={commentStyle}>
          <div className="comment-thumbnail"
               style={thumbnailStyle}>
          </div>
          <div className="comment-text">
              <Link to={"users/" + comment.author.id} className="comment-username">{comment.author.username}</Link>
              <span className="comment-body">{comment.body}</span>
          </div>
        </div>
      );
    }
  });
}(this));
