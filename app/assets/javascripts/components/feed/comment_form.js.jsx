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
      return (
        <div className="song-comment-form">
          <input type="text"
                 placeholder="Add comment"
                 onKeyUp={this.keyUpHandler}
                 valueLink={this.linkState("commentBody")}/>
        </div>
      )
    }
  })


}(this));
