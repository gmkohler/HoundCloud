/* global UserStore*/
/* global UserApiUtil*/
/* global React*/
(function(root) {
  'use strict';
  root.SuggestionIndex = React.createClass({
    getInitialState: function () {
      return ({suggestions: []});
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._getSuggestionsFromStore);
      this._updateSuggestions(this.state.searchQuery);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._getSuggestionsFromStore);
    },

    componentWillReceiveProps: function (newProps) {
      this._updateSuggestions(newProps.searchQuery);
    },

    _updateSuggestions: function (searchQuery) {
        UserApiUtil.fetchQueriedUsers(searchQuery);
    },

    _getSuggestionsFromStore: function () {
      if (this.props.searchQuery === "") {
        this.setState({suggestions: []});
      } else {
        this.setState(
          {suggestions: UserStore.getMatchingUsers(this.props.searchQuery, 5)}
        );
      }
    },

    render: function () {
      var indexItems = this.state.suggestions.map(function(user) {
        return (<SuggestionIndexItem key={user.id} user={user}/>);
      });

      return (
        <ul className="auto-search">
          {indexItems}
        </ul>
      )
    }

  });
}(this));
