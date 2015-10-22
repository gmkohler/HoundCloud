(function(root) {
  'use strict';
  root.SearchIndexSideBar = React.createClass({
    getInitialState: function () {
      return {tags: {}, selected: null};
    },

    componentDidMount: function () {
      SearchStore.addResultsChangeListener(this._setTags);
      SearchStore.addFiltersChangeListener(this._setSelected);
      this._setTags;
    },

    componentWillUnmount: function () {
      SearchStore.removeResultsChangeListener(this._setTags);
      SearchStore.removeResultsChangeListener(this._setSelected);
    },

    _setTags: function () {
      this.setState({tags: SearchStore.getTags()});
    },

    _setSelected: function () {
      this.setState({selected: SearchStore.getFilters("tagID")});
    },

    _tagToggle: function (e) {
      e.preventDefault();
      var clickedTagID = parseInt(e.currentTarget.id);
      var newTagID = clickedTagID === this.state.selected ? null : clickedTagID;
      SearchActions.receiveFilters({tagID: newTagID});
    },

    _showUsersToggle: function (e) {
      e.preventDefault();
      SearchActions.receiveFilters({showUsers: !this.props.showUsers});
    },

    _showSongsToggle: function (e) {
      e.preventDefault();
      SearchActions.receiveFilters({showSongs: !this.props.showSongs});
    },

    render: function () {
      var tags = this.state.tags,
          that = this;

      var tagComponents = (
        Object.keys(tags).map(function(tagID){
          return (
            <div id={tagID}
                 onClick={that._tagToggle}>
              <span>{tags[tagID]}</span>
            </div>
          );
        })
      );

      var tagFilters = (
        <div>
          <span>Filter by Tag: {this.state.tags[this.state.selected]}</span>
          <div>{tagComponents}</div>
        </div>
      );
      return (
        <div className="search-sidebar">
          <div>
            <span>All</span>
            <i className="glyphicon glyphicon-search"></i>
          </div>
          <div onClick={this._showUsersToggle}>
            <span>Users: {this.props.showUsers ? "ON" : "OFF"}</span>
            <i className="glyphicon glyphicon-user"></i>
          </div>
          <div onClick={this._showSongsToggle}>
            <span>Songs {this.props.showSongs ? "ON" : "OFF"}</span>
            <i className="glyphicon glyphicon-cd"></i>
          </div>
          {this.props.showSongs ? tagFilters : null}
        </div>
      );
    }
  });
}(this));
