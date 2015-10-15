(function(root) {
  'use strict';
  root.UserInfo = React.createClass({

    render: function () {
      return (
        <div className="col-md-4">
          <img className="img-thumbnail" src={this.props.user.image_url}/>
          <h1 className="center-block">{this.props.user.username}</h1>
        </div>
      );
    }
  });
}(this));
