(function(root) {
  'use strict';
  root.UserInfo = React.createClass({

    render: function () {
      var user = this.props.user ||
        {image_url: "",
         cover_image_url: "",
         username: "",
         location: ""};

      var profPicBackground,
          userInfoBackground;
      if (user.image_url && user.cover_image_url) {
        profPicBackground = 'url(' + user.image_url + ')',
        userInfoBackground = 'url(' + user.cover_image_url + ')';
      } else {
        profPicBackground = "",
        userInfoBackground = "";
      }

      var profPicStyle = {
        backgroundImage: profPicBackground,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: "1px solid #000000"
      };

      var userInfoStyle = {
        backgroundImage: userInfoBackground
      };

      return (
        <div className="user-info" style={userInfoStyle}>
            <div className="user-show-image" style={profPicStyle}/>
            <div classname="user-show-info">
              <h3 className="user-info-name">{user.username}</h3>
                <br/>
              <h4 className="user-info-location">{user.location}</h4>
            </div>

        </div>
      );
    }
  });
}(this));
