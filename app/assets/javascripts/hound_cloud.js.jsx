/* global React */
/* global ReactRouter */
function HoundCloud () {
  'use strict';

  var App = React.createClass({
    getInitialState: function () {
      return {songForm: ModalStore.getModal("songForm")};
    },

    _onSearch: function (searchQuery) {
      this.props.history.pushState(null, 'search', {searchQuery: searchQuery});
    },

    componentDidMount: function () {
      ModalStore.registerSongFormChangeListener(this._getSongFormFromStore);
    },

    componentWillUnmount: function () {
      ModalStore.removeSongFormChangeListener(this._getSongFormFromStore);
    },

    _getSongFormFromStore: function () {
      this.setState({songForm: ModalStore.getModal("songForm")});
    },

    render: function () {
      var songForm = this.state.songForm;
      return (
        <div id="app">
          <Navbar onSearch={this._onSearch}/>
          <SongForm active={songForm.state} song={songForm.prop}/>
          <div className="container" id="page">
            {this.props.children}
          </div>
          <AudioPlayer />
        </div>
      );
    }
  });

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={UserHome}/>
      <Route path="search" component={SearchIndex}/>
      <Route path="users/:id" component={UserShow}/>
    </Route>
  );


  React.render(<Router>{routes}</Router>, root);


}
