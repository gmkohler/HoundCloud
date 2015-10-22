/* */
(function(root) {
  'use strict';
  root.SearchIndexHeader = React.createClass({

    render: function () {
      var query = this.props.query;
      var searchBoilerplate = query ? " results for \"" + query + "\"" : "";

      return (
        <div className="contianer">
          <div className="left">
          <span>{"Search" + searchBoilerplate}</span>
          </div>
          <div className="right">
            0 artists, 0 tracks
          </div>
        </div>
      );
    }
  });
}(this));
