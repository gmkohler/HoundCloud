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

      var userInfoStyle = {
        backgroundImage: 'url(' + user.cover_image_url + ')',

      };

      return (
        <div className="user-info" style={userInfoStyle}>
            <div className="user-show-image" style={profPicStyle}/>
            <div classname="user-show-info">
              <h3 className="user-info-name">{this.props.user.username}</h3>
                <br/>
              <h4 className="user-info-location">{this.props.user.location}</h4>
            </div>

        </div>
      );
    }
  });
}(this));
