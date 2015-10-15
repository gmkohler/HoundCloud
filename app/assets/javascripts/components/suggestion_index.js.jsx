/* global UserStore*/
/* global UserApiUtil*/
/* global React*/
(function(root) {
  'use strict';
  root.SuggestionIndex = React.createClass({

    componentWillMount: function () {
      this._updateSuggestions(this.props.searchQuery);
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._getSuggestionsFromStore);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._getSuggestionsFromStore);
    },

    componentWillReceiveProps: function (newProps) {
      this._updateSuggestions(newProps.searchQuery);
    },

    _updateSuggestions: function () {
      var searchQuery = this.props.searchQuery;
      
      if (searchQuery==="") {
        this.suggestions = [];
      } else {
        UserApiUtil.fetchQueriedUsers(searchQuery);
      }
    },

    _getSuggestionsFromStore: function () {
      this.suggestions = UserStore.getMatchingUsers(this.props.searchQuery, 5);
    },

    render: function () {
      var indexItems = this.suggestions.map(function(user) {
        return (<SuggestionIndexItem user={user}/>);
      });

      return (<div>{indexItems}</div>);
    }
  });
}(this));
