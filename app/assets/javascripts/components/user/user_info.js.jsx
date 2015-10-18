(function(root) {
  'use strict';
  root.UserInfo = React.createClass({

    render: function () {
      var user = this.props.user;

      var profPicStyle = {
        backgroundImage: 'url(' + user.image_url + ')',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: "1px solid #000000"
      };
      return (
        <div className="container user-info">
          <div className="user-info-content">
            <div className="user-info-image" style={profPicStyle}/>
            <div>
              <h3 className="user-info-name">{this.props.user.username}</h3>          
              <h4 className="user-info-location">Long Beach, Calif.</h4>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
