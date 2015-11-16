/* global UserStore*/
/* global UserApiUtil*/
/* global React*/
(function(root) {
  'use strict';
  root.SearchBar = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return ({searchQuery: "", isHovering: true});
    },

    componentDidMount: function () {
      this._enableBlur();
    },

    _preventBlur: function () {
      this.setState({isHovering: true});
    },

    _enableBlur: function () {
      this.setState({isHovering: false});
    },

    _handleBlur: function (e) {
      if (this.state.isHovering && e) {
        e.preventDefault();
        var target = e.target;

        setTimeout(function () {
            target.focus()
        }, 0);

      } else {
        this._clearQuery()
      }
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
      e.target.blur();
      this.props.onSearch(this.state.searchQuery.toLowerCase());
      this._clearQuery();
    },

    render: function () {
      // Put a class on div so that suggestionindex can be positioned
      // relative to it.
      // <SuggestionIndex searchQuery={this.state.searchQuery}/>


      return (
        <div id="search-bar-container"
             className="clearfix">
          <form id="search-bar"
                className="navbar-form navbar-left col-lg-6"
                role="search"
                onMouseOver={this._preventBlur}
                onMouseLeave={this._enableBlur}
                onBlur={this._handleBlur}
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
            <SuggestionIndex clearQuery={this._clearQuery}
                             searchQuery={this.state.searchQuery.toLowerCase()}/>
          </form>
        </div>
      );
    }
  });
}(this));
