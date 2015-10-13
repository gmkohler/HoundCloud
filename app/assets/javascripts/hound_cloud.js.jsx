$(function() {
  'use strict';
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;


  var App = React.createClass({
    render: function () {
      return (
        <div>
          <header><h1>HoundCloud</h1></header>
        </div>
      );
    }
  });

  var routes = (
    <Route path="/" component={App}>
    </Route>
  );
  
  if (root) {
    React.render(<Router>{routes}</Router>, root);
  }

});
