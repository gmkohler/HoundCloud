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
          <UserShowBar user={user}/>
          <div className="feed-container">
            <FeedIndex user={user} context={"show"}/>
            <UserShowSideBar user={user}/>
          </div>
        </div>
      );
    }
  })
}(this));
          //  <FeedIndex user={this.state.user}/>
