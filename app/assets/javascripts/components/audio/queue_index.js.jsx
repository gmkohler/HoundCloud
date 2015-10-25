(function(root) {
  'use strict';
  root.QueueIndex = React.createClass({
    componentWillReceiveProps: function () {
    },

    render: function () {
      var queueIndexItems;
      var queueLength = this.props.queue.length;
      if (queueLength > 0) {
        queueIndexItems = this.props.queue.map(function(song, idx){
          return (
            <li id={idx + 1}>
              <QueueIndexItem song={song}
                              idx={idx + 1}
                              last={(idx === queueLength - 1)}
                              first={(idx === 0)}/>
            </li>
          );
        }).reverse();
      } else {
        queueIndexItems = "Nothing playing!"
      }
      return (
          <li className="dropup">
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
