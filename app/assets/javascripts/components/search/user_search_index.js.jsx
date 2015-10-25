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
      SearchStore.addResultsChangeListener(this._onUsersChange);
      UserApiUtil.fetchQueriedUsers(this.props.query);
    },

    componentWillReceiveProps: function (newProps) {
      UserApiUtil.fetchQueriedUsers(newProps.query);
    },

    componentWillUnmount: function () {
      SearchStore.removeResultsChangeListener(this._onUsersChange);
    },

    _getStateFromStore: function () {
      return SearchStore.getUsers(this.props.query);
    },

    _onUsersChange: function () {
      this.setState({users: this._getStateFromStore()});
    },

    render: function () {
      var users = this.state.users.map(function(user) {
        return (<UserSearchIndexItem key={user.id} user={user}/>);
      });

      return (
        <div className="user-search-index">
          <div>{users}</div>
        </div>
      );
    }
  });
}(this));
