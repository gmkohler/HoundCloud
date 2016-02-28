(function(root) {
  'use strict';
  root.CommentForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {commentBody: ""};
    },

    keyUpHandler: function (e) {
      e.preventDefault();
      var RETURN_KEY_CODE = 13;
      if (e.keyCode === RETURN_KEY_CODE) {
        this.props.addComment(this.state.commentBody);
        this.setState({commentBody: ""});
      }
    },

    render: function () {
      var thumbnailStyle = {
        height:"20px",
        width:"20px",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        position:"absolute",
        left: "20px",
        backgroundImage: "url(" + CURRENT_USER_IMAGE_URL + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      };

      return (
        <div className="song-comment-form">
          <div className="comment-thumbnail" style={thumbnailStyle}/>
          <input type="text"
                 placeholder="Write a comment"
                 onKeyUp={this.keyUpHandler}
                 valueLink={this.linkState("commentBody")}/>
        </div>
      );
    }
  });


}(this));
