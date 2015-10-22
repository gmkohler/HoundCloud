(function(root) {
  'use strict';
  root.SideBarFollowIndex = React.createClass({
    // Could set state to something like UserStore.getMostFollowed(3)
    // Need to ensure the users aren't being followed already.

    // Would then eventually want to listen to users and re-fetch when a user
    // has been followed as to suggest a new user

    render: function () {
      return (
        <div>
          <div>
            <h4>Who To Follow</h4>
            <i className="glyphicon glyphicon-user"/>
          </div>
          <SideBarFollowIndexItem />
          <SideBarFollowIndexItem />
          <SideBarFollowIndexItem />
        </div>
      );
    }
  });
}(this));
