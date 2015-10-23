(function(root) {
  'use strict';
  root.QueueIndex = React.createClass({
    componentWillReceiveProps: function () {
    },

    render: function () {
      var queueIndexItems;
      if (this.props.queue.length > 0) {
        queueIndexItems = this.props.queue.map(function(song, idx){
          return (
            <li id={idx + 1}>
              <QueueIndexItem song={song} idx={idx + 1}/>
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

             <ul className="dropdown-menu">
               {queueIndexItems}
             </ul>
          </li>
      );
    }
  });
}(this));
