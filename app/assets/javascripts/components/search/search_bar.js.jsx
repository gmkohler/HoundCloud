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

    _submit: function (e) {
      e.preventDefault();
      this.props.onSearch(this.state.searchQuery)
    },

    render: function () {
      // Put a class on div so that suggestionindex can be positioned
      // relative to it.
      // <SuggestionIndex searchQuery={this.state.searchQuery}/>
      return (
          <form className="navbar-form navbar-left"
                role="search"
                onSubmit={this._submit}>
            <div className="form-group has-feedback">
              <input type="text"
                     className="form-control"
                     valueLink={this.linkState("searchQuery")}
                     placeholder="search for users"/>
              <i className="glyphicon glyphicon-search form-control-feedback"/>
            </div>
          </form>
      );
    }
  });
}(this));
