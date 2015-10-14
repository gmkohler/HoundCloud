/* global React */
/* global cloudinary */
(function(root) {
  'use strict';
  root.SongForm = React.createClass({
    getInitialState: function () {
      return {imageFilename: "", songTitle: ""}
    },

    onTitleChange: function (e) {
      e.preventDefault();
      this.setState({songTitle: e.currentTarget.value});
    },

    openCloudinaryWidgetImage: function(e) {
      var that = this;
      e.preventDefault();
      cloudinary.openUploadWidget(
        {cloud_name: 'gmkohler', upload_preset: 'gtv1su2k'},
        function(error, result) {
          that.setState({imageFilename: result["0"].original_filename,
                         imageUrl: result["0"].secure_url});
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
          that.setState({imageFilename: result["0"].original_filename,
                         thumbnailUrl: result["0"].thumbnail_url,
                         imageUrl: result["0"].secure_url});
          console.log(error, result);
        }
      );
    },

    createSong: function () {

    },
    render: function () {
      return (
        <div>
          <p>
            <label for="song_title">Title: </label>
            <input type="text"
                   name="song[title]"
                   id="song_title"
                   onChange={this.onTitleChange}
                   value={this.state.songTitle}/>
          </p>
           <p>
             <label for="song_content_url"> Image file path: </label>
             <a href="#"
                onClick={this.openCloudinaryWidgetImage}>{this.state.audio_filename || "Choose file path" }</a>
           </p>

           <p>
             <label for="song_image_url"> Audio file path: </label>
             <a href="#"
                onClick={this.openCloudinaryWidgetImage}>{this.state.image_filename || "Choose file path" }</a>
           </p>


        </div>
     );
    }
  });
}(this));
