(function(root) {
  'use strict';
  root.UserShow = React.createClass({
    getInitialState: function () {
      return {user: this._getUserFromStore()};
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

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onUserChange);
    },

    render: function () {
      var user = this.state.user;
      return (
        <div>
          <FeedIndex user={user}/>
        </div>
      );
    }
  })
}(this));
          //  <FeedIndex user={this.state.user}/>
