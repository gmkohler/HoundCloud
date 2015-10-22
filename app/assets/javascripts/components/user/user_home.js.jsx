/* global React */
(function(root) {
  'use strict';
  root.UserHome = React.createClass({
    getInitialState: function () {
      return {user: (this._getCurrentUser() || {username: "", id: ""})};
    },

    _getCurrentUser: function () {
      return UserStore.getUser(CURRENT_USER_ID);
    },

    componentDidMount: function () {
      UserStore.addChangeListener(function () {
        this.setState({user: this._getCurrentUser()});
      }.bind(this));

      UserApiUtil.fetchSingleUser(CURRENT_USER_ID);
    },

    render: function () {
      return (
        <div className="container feed-container">
          <div>
            <UserHomeBar user={this.state.user} />
          </div>
          <div>
            <FeedIndex user={this.state.user} home={true}/>
            <UserHomeSideBar user={this.state.user}/>
          </div>
        </div>
      )
    }
  });
}(this));
