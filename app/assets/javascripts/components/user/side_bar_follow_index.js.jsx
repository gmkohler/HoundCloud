(function(root) {
  'use strict';
  root.SideBarFollowIndex = React.createClass({
    getInitialState: function () {
      return {users: []};
    },

    componentDidMount: function () {
      UserApiUtil.fetchFollowSuggestions();
      UserStore.addChangeListener(this._onChange);
    },

    _onChange: function () {
      this.setState({users: UserStore.getFollowSuggestions(3)});
    },
    // Could set state to something like UserStore.getMostFollowed(3)
    // Need to ensure the users aren't being followed already.

    // Would then eventually want to listen to users and re-fetch when a user
    // has been followed as to suggest a new user

    render: function () {
      var userIndices = this.state.users.map(function(user) {
        return <SideBarFollowIndexItem key={user.id} user={user}/>
      });
      return (
        <div>
          <div className="follow-suggestion-header">
            <i className="glyphicon glyphicon-user"/>
            <span>Who To Follow</span>
          </div>
          {userIndices}
        </div>
      );
    }
  });
}(this));
