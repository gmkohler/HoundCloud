(function(root) {
  'use strict';
  root.SideBarLikesIndex = React.createClass({
    propTypes: {
      userId: React.PropTypes.number
    },

    getInitialState: function () {
      return {likes: []};
    },

    componentDidMount: function () {
      if (this.props.userId) {
        SongApiUtil.fetchLikedSongs(this.props.userId);
      }
      SongStore.addLikesChangeListener(this._onChange);
    },

    componentWillReceiveProps: function (newProps) {
      if (newProps.userId && newProps.userId !== this.props.userId) {
        SongApiUtil.fetchLikedSongs(newProps.userId);
      }
    },

    componentWillUnmount: function () {
      SongStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
      this.setState({likes: SongStore.getLikes()});
    },

    // Would then eventually want to listen to users and re-fetch when a user
    // has been followed as to suggest a new user

    render: function () {
      var likes = this.state.likes.map(function(song) {
        return (<QueueIndexItem key={song.id} song={song} context="sideBar"/>);
      });
      return (
        <div>
          <div className="follow-suggestion-header">
            <i className="glyphicon glyphicon-heart"/>
            <span className="follow-suggestion-label">{likes.length} Likes</span>
          </div>
          {likes}
        </div>
      );
    }
  });
}(this));
