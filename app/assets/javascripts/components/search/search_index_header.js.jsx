/* */
(function(root) {
  'use strict';
  root.SearchIndexHeader = React.createClass({

    render: function () {
      var query = this.props.query;
      var searchBoilerplate = query ? " results for \"" + query + "\"" : "";
          // <div className="right">
          //   0 artists, 0 tracks
          // </div>

      return (
        <div className="clearfix search-index-header">
          <div className="clearfix search-index-bar">
            <div className="clearfix left">
              <span>{"Search" + searchBoilerplate}</span>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
