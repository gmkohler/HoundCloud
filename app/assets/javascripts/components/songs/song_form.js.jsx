/* global React */
/* global cloudinary */
(function(root) {
  'use strict';
  root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {songTitle: ""}
    },

    openCloudinaryWidgetImage: function(e) {
      var that = this;
      e.preventDefault();
      cloudinary.openUploadWidget(
        {cloud_name: 'gmkohler', upload_preset: 'gtv1su2k'},
        function(error, result) {
          that.setState({imageFilename: result["0"].original_filename,
                         songImageUrl: result["0"].secure_url});
          console.log(error, result);
        }
      );
    },

    openCloudinaryWidgetAudio: function(e) {
      var that = this;
      e.preventDefault();
      cloudinary.openUploadWidget(
        {cloud_name: 'gmkohler', upload_preset: 'gtv1su2k'},
        function(error, result) {
          if (result["0"])
          that.setState({contentFilename: result["0"].original_filename,
                         songContentUrl: result["0"].secure_url});
          console.log(error, result);
        }
      );
    },

    createSong: function (e) {
      var songParams = {
        title: this.state.songTitle,
        content_url: this.state.songContentUrl,
        image_url: this.state.songImageUrl
      };

      var onSuccess = function (data) {
        debugger;
        window.location = ('/api/songs/' + data.id)
      };

      ApiUtil.postSong(songParams, onSuccess);
    },

    render: function () {
      return (
        <div className="container col-lg-3">
          <div className="page-header"><h3>Upload a song</h3></div>
          <form>
          <div className="form-group">
            <label for="song_title">Title</label>
            <input type="text"
                   className="form-control"
                   name="song[title]"
                   id="song_title"
                   valueLink={this.linkState("songTitle")}/>
          </div>
          <div className="form-group">
            <label for="song_image_url"> Audio file path:</label>
            <input type="file"
                   id="song_image_url"
                   onClick={this.openCloudinaryWidgetAudio}/>
          </div>
          <div className="form-group">
            <label for="song_content_url"> Image file path: </label>
            <input type="file"
                   id="song_content_url"
                   onClick={this.openCloudinaryWidgetImage}/>
                 <p className="help-block"><em>(Optional)</em></p>
           </div>
           <button type="submit"
                   className="btn btn-default"
                   onClick={this.createSong}>Submit</button>
         </form>
        </div>
     );
    }
  });
}(this));
