(function(root) {
  'use strict';
  root.SuggestionIndex = React.createClass({

    componentWillMount: function () {
      this._updateSuggestions(this.props.searchQuery);
    },

    componentDidMount: function () {
      UserStore.addSuggestionsChangeListener(this._getSuggestionsFromStore);
    },

    componentWillUnmount: function () {
      UserStore.removeSuggestionsChangeListener(this._getSuggestionsFromStore);
    },

    componentWillReceiveProps: function (newProps) {
      debugger;
      this._updateSuggestions(newProps.searchQuery);
    },

    _updateSuggestions: function (searchQuery) {
      if (searchQuery==="") {
        this.suggestions=[];
      } else {
        UserApiUtil.fetchSuggestedUsers(searchQuery);
      }
    },

    _getSuggestionsFromStore: function () {
      this.suggestions = UserStore.getAll();
    },

    render: function () {
      var indexItems = this.suggestions.map(function(user) {
        return (<SuggestionIndexItem user={user}/>);
      });

      return (<div>{indexItems}</div>);
    }
  });
}(this));
