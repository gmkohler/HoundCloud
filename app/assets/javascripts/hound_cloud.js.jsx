/* global React */
/* global ReactRouter */
function HoundCloud () {
  'use strict';

  var App = React.createClass({

    _onSearch: function (searchQuery) {
      this.props.history.pushState(null, 'search', {searchQuery: searchQuery});
    },



    render: function () {
      return (
        <div id="app">
          <Navbar onSearch={this._onSearch}/>
          <SongForm />
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
