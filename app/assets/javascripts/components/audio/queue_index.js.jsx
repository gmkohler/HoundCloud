(function(root) {
  'use strict';
  root.QueueIndex = React.createClass({
    componentWillReceiveProps: function () {
    },

    stayExpanded: function (e) {
      e.stopPropagation();
    },

    render: function () {
      var queueIndexItems;
      var queueLength = this.props.queue.length;
      if (queueLength > 0) {
        queueIndexItems = this.props.queue.map(function(song, idx){
          return (
            <li className="clearfix" id={idx + 1}>
              <QueueIndexItem key={song.queueID}
                              song={song}
                              idx={idx + 1}
                              last={(idx === queueLength - 1)}
                              first={(idx === 0)}/>
            </li>
          );
        }).reverse();
      } else {
        queueIndexItems = [
          <li className="clearfix">
            <div className="clearfix queue-index-item">
              <div className="queue-index-item-thumbnail-container"></div>
              <div className="queue-index-item-info">
                <div>
                  <span>
                    Nothing in queue.
                  </span>
                </div>
              </div>
            </div>
          </li>
        ];
      }



      return (
          <li className="dropup"
              onClick={this.stayExpanded}>
            <a href="#"
               className="dropdown-toggle"
               data-toggle="dropdown"
               role="button"
               aria-has-popup="true"
               aria-expanded="false">
              <div>
                queue
                <span className="glyphicon glyphicon-menu-up"/>
              </div>
            </a>

            <ul className="dropdown-menu queue-index-item">
              {queueIndexItems}
            </ul>
          </li>
      );
    }
  });
}(this));
