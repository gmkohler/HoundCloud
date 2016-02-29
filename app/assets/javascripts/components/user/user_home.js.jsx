/* global React */
(function(root) {
  'use strict';
  root.UserHome = React.createClass({
    getInitialState: function () {
      return {user: (this._getCurrentUser() ||
                       {username: CURRENT_USER_USERNAME,
                        id: CURRENT_USER_ID}
              )};
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
        <div id="user-home-container">
          <div>
            <UserHomeBar user={this.state.user} />
          </div>

          <div>
            <FeedIndex context={"home"} data={this.state.user}/>
            <UserHomeSideBar user={this.state.user}/>
          </div>
        </div>
      );
    }
  });
}(this));
