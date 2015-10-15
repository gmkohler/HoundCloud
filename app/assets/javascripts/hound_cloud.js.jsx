function HoundCloud () {
  'use strict';
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;
  var Link = ReactRouter.Link;


  var App = React.createClass({

    _onSearch: function (searchQuery) {
      this.props.history.pushState(null, 'users', {username: searchQuery});
    },

    render: function () {
      return (
        <div>
          <Navbar onSearch={this._onSearch}/>
          {this.props.children}
        </div>
      );
    }
  });

  var routes = (
    <Route path="/" component={App}>
      <Route path="songs/new" component={SongForm}/>
      <Route path="users" component={UserIndex}/>
      <Route path="users/:id" component={UserShow}/>

    </Route>

  );


  React.render(<Router>{routes}</Router>, root);


}
