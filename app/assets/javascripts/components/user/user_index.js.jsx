/* global React */
/* global UserStore */
/* global UserApiUtil */
/* global UserIndexItem */
(function(root) {
  'use strict';
  root.UserIndex = React.createClass({
    getInitialState: function () {
      var users = this._getStateFromStore();
      return ({users: users});
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._onUsersChange);
      UserApiUtil.fetchQueriedUsers(this.props.location.query.username);
    },

    componentWillReceiveProps: function (newProps) {
      UserApiUtil.fetchQueriedUsers(newProps.location.query.username);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onUsersChange);
    },

    _getStateFromStore: function () {
      var searchQuery = this.props.location.query.username;
      return UserStore.getMatchingUsers(searchQuery);
    },

    _onUsersChange: function () {
      this.setState({users: this._getStateFromStore()});
    },

    render: function () {
      var users = this.state.users.map(function(user) {
        return (<UserIndexItem key={user.id} user={user}/>);
      });

      return (<div>{users}</div>);
    }
  });
}(this));
