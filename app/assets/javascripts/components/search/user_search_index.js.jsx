/* global React */
/* global UserStore */
/* global UserApiUtil */
/* global UserSearchIndexItem */
(function(root) {
  'use strict';
  root.UserSearchIndex = React.createClass({
    getInitialState: function () {
      var users = this._getStateFromStore();
      return ({users: users});
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._onUsersChange);
      UserApiUtil.fetchQueriedUsers(this.props.query);
    },

    componentWillReceiveProps: function (newProps) {
      UserApiUtil.fetchQueriedUsers(newProps.query);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onUsersChange);
    },

    _getStateFromStore: function () {
      return UserStore.getMatchingUsers(this.props.query);
    },

    _onUsersChange: function () {
      this.setState({users: this._getStateFromStore()});
    },

    render: function () {
      var users = this.state.users.map(function(user) {
        return (<UserSearchIndexItem key={user.id} user={user}/>);
      });

      return (
        <div>
          <span><h3>Users:</h3></span>
          <div>{users}</div>
        </div>
      );
    }
  });
}(this));
