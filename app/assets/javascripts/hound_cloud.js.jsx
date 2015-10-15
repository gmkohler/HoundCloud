function HoundCloud () {
  'use strict';
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;


  var App = React.createClass({
    render: function () {
      return (
        <div>
          <Navbar/>
          {this.props.children}
        </div>
      );
    }
  });

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={FeedIndex}/>

      <Route path="songs/new" component={SongForm}/>
      <Route path="users" component={UserIndex}/>
      <Route path="users/:id" component={UserShow}/>

    </Route>

  );


  React.render(<Router>{routes}</Router>, root);


}
