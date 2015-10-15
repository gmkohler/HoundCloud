/* global React */
/* global UserStore */
(function(root) {
  'use strict';
  root.UserIndex = React.createClass({
    getInitialState: function () {
      return ({users: []});
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._onUsersChange);
      UserApiUtil.fetchQueriedUsers(this.props.location.query.username);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onUsersChange);
    },

    _getStateFromStore: function () {
      return {users: UserStore.getAll()};
    },

    _onUsersChange: function () {
      this.setState(this._getStateFromStore());
    },
    render: function () {

      var users = this.state.users.map(function(user) {
        return (<UserIndexItem key={user.id} user={user}/>);
      });

      return (<div>{users}</div>);
    }
  });
}(this));
