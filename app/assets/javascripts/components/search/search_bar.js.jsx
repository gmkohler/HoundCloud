/* global UserStore*/
/* global UserApiUtil*/
/* global React*/
(function(root) {
  'use strict';
  root.SearchBar = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return ({searchQuery: ""});
    },

    render: function () {
      // Put a class on div so that suggestionindex can be positioned
      // relative to it.
      return (
        <div className="col-lg-2">
          <form className="navbar-form"
                role="search"
                onSubmit={this.props.onSearch}>
            <div className="form-group has-feedback">
              <input type="text"
                     className="form-control"
                     valueLink={this.linkState("searchQuery")}
                     placeholder="search for users"/>
              <i className="glyphicon glyphicon-search form-control-feedback"/>
            </div>
          </form>
          <SuggestionIndex searchQuery={this.state.searchQuery}/>
        </div>
      );
    }
  });
}(this));
