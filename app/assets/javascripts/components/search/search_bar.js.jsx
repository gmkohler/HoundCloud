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

    _clearQuery: function () {
      this.setState({searchQuery: ""});
    },

    _keyUpHandler: function (e) {
      var ESC_KEY_CODE = 27;
      if (e.keyCode === ESC_KEY_CODE) {
        this._clearQuery();
      }
    },

    _submit: function (e) {
      e.preventDefault();
      this._clearQuery();
      this.props.onSearch(this.state.searchQuery);
    },

    render: function () {
      // Put a class on div so that suggestionindex can be positioned
      // relative to it.
      // <SuggestionIndex searchQuery={this.state.searchQuery}/>
      return (
        <div id="search-bar-container" className="clearfix">
          <form id="search-bar"
                className="navbar-form navbar-left col-lg-6"
                role="search"
                onKeyUp={this._keyUpHandler}
                onSubmit={this._submit}>

            <input type="submit" id="search-submit"/>
            <div className="form-group has-feedback">
              <input type="text"
                     className="navbar-search form-control"
                     valueLink={this.linkState("searchQuery")}
                     placeholder="Search"/>
              <i className="glyphicon glyphicon-search form-control-feedback"/>
            </div>
          </form>
          <SuggestionIndex clearQuery={this._clearQuery}
                           searchQuery={this.state.searchQuery}/>
        </div>
      );
    }
  });
}(this));
