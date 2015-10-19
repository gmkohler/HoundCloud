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
        <div className="row user-info">

            <div className="col-md-4 user-info-image" style={profPicStyle}/>
            <div classname="col-md-4">
              <h3 className="user-info-name">{this.props.user.username}</h3>
                <br/>
              <h4 className="user-info-location">Long Beach, Calif.</h4>
            </div>

        </div>
      );
    }
  });
}(this));
