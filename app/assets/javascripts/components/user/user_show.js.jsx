(function(root) {
  'use strict';
  root.UserShow = React.createClass({
    getInitialState: function () {
      return {user: (this._getUserFromStore() || {username: "", id: ""})};
    },

    _getUserFromStore: function () {
      var userID = parseInt(this.props.params["id"]);
      return UserStore.getUser(userID);
    },

    _onUserChange: function () {
      this.setState({user: this._getUserFromStore()});
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._onUserChange);
      UserApiUtil.fetchSingleUser(this.props.params["id"]);
    },

    componentWillReceiveProps: function (newProps) {
      UserApiUtil.fetchSingleUser(newProps.params["id"]);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onUserChange);
    },

    render: function () {
      var user = this.state.user;
      return (
        <div>
          <UserInfo user={user}/>
          <div className="feed-container">
            <UserShowBar user={user}/>
            <FeedIndex user={user} home={false}/>
          </div>
        </div>
      );
    }
  })
}(this));
          //  <FeedIndex user={this.state.user}/>
