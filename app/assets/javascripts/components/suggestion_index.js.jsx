(function(root) {
  'use strict';
  root.SuggestionIndex = React.createClass({

    componentWillMount: function () {
      this.suggestions = [];
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._updateSuggestions);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._updateSuggestions);
    },

    componentWillReceiveProps: function (newProps) {
      // debugger;
      UserApiUtil.fetchQueriedUsers(newProps.searchQuery);
    },

    _updateSuggestions: function () {
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
