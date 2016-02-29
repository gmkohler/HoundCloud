(function(root) {
  'use strict';
  root.UserShow = React.createClass({
    // a hacky self-controlled state....

    getInitialState: function () {
      return {user: (this._getUserFromStore() || {username: "", id: ""}),
              context: "show"};
    },

    _getUserFromStore: function () {
      var userId = parseInt(this.props.params["id"]);
      return UserStore.getUser(userId);
    },

    _onUserChange: function () {
      this.setState({user: this._getUserFromStore()});
    },

    _showAll: function () {
      this.setState({context: "show"});
    },

    _showTracks: function () {
      this.setState({context: "showTracks"});
    },

    _showReposts: function () {
      this.setState({context: "showReposts"});
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
          <UserShowBar user={user}
                       showAll={this._showAll}
                       showReposts={this._showReposts}
                       showTracks={this._showTracks}
                       context={this.state.context}/>
          <div className="user-show-container">
            <FeedIndex context={this.state.context} data={user}/>
            <UserShowSideBar user={user}/>
          </div>
        </div>
      );
    }
  })
}(this));
