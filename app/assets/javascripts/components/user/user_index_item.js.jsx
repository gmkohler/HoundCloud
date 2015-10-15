(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserIndexItem = React.createClass({

    render: function () {
      var user = this.props.user,
          userUrl = "users/" + user.id,
          indexItem;
      if (user) {
        indexItem = (
          <div>
            <img src={user.image_url}
                 height="80px"
                 width="80px"
                 className="img-thumbnail"/>
               <Link to={userUrl}>{user.username}</Link>
          </div>
        );
      } else {
        indexItem = <div></div>
      }

      return indexItem;
    }

  });
}(this));
