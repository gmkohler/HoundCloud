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

    _showAll: function (e) {
      e.preventDefault();
      SearchActions.receiveFilters({showUsers: true, showSongs: true});
    },

    _showUsersToggle: function (e) {
      e.preventDefault();
      SearchActions.receiveFilters({showUsers: true, showSongs: false});
    },

    _showSongsToggle: function (e) {
      e.preventDefault();
      SearchActions.receiveFilters({showUsers: false, showSongs:true});
    },

    render: function () {
      var tags = this.state.tags,
          that = this;

      var allHighlight = (this.props.showUsers && this.props.showSongs) ? "active" : "";
      var usersHighlight = !allHighlight && this.props.showUsers ? "active" : "";
      var songsHighlight = !allHighlight && this.props.showSongs ? "active" : "";

      var tagComponents = (
        Object.keys(tags).map(function(tagID){
          var activeText = (parseInt(tagID) === this.state.selected) ? " active" : "";
          return (
            <div id={tagID}
                 className={"index-item-tag" + activeText}
                 onClick={that._tagToggle}>
              <span className="index-item-tag-text">{"#" + tags[tagID]}</span>
            </div>
          );
        }.bind(this))
      );
      var selectedTag
      if (this.state.selected) {
        selectedTag = (
          <div className={"index-item-tag active"}>
            <span className="index-item-tag-text">
              {"#" + tags[this.state.selected.toString()]}
            </span>
          </div>
        );
      }

      var tagFilters = (
        <div>
          <div className="tag-header">
            <span>Filter by Tag: </span>
            {this.state.selected ? selectedTag : null}
          </div>
          <div className="index-item-tag-collection">{tagComponents}</div>
        </div>
      );
      return (
        <div className="search-sidebar">
          <div className={allHighlight} onClick={this._showAll}>
            <i className="glyphicon glyphicon-search"></i>
            <span>All</span>
          </div>
          <div className={usersHighlight} onClick={this.props.usersToggle}>
            <i className="glyphicon glyphicon-user"></i>
            <span>Users</span>
          </div>
          <div className={songsHighlight} onClick={this.props.songsToggle}>
            <i className="glyphicon glyphicon-music"></i>
            <span>Songs</span>
          </div>
          {this.props.showSongs ? tagFilters : null}
        </div>
      );
    }
  });
}(this));
