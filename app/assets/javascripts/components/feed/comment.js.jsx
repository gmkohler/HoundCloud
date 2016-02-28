(function(root) {
  'use strict';
  root.SongComment = React.createClass({
    render: function () {
      var comments = this.props.comments,
          headComment = comments[0],
          percentElapsed = "" + (parseFloat(this.props.commentTime) * 100) + "%";
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
          <div className="song-comment-wrapper">
            <div className="song-comment" key={comment.id}>
              <span>
                <Link to={"users/" + comment.author.id} className="comment-username">
                  {comment.author.username}
                </Link>
              </span>
              <span className="comment-content">{comment.body}</span>
            </div>
          </div>
        );
      });


      var isActive = (Math.abs(this.props.currentPercentElapsed - parseFloat(this.props.commentTime)) <= 0.01 &&
                       this.props.currentPercentElapsed !== 0) ? " active" : "";

      return (
        <div className="song-comment-aggregate"
             style={commentStyle}>
          <div className="comment-thumbnail"
               style={thumbnailStyle}>
          </div>
          <div className={"comment-bodies clearfix" + isActive}>
            {commentBodies}
          </div>
        </div>
      );
    }
  });
}(this));
