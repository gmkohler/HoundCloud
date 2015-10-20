/* global React */
/* global cloudinary */
(function(root) {
  'use strict';
  root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {songTitle: "", tagNames: [], tagForm: ""}
    },

    openCloudinaryWidgetImage: function(e) {
      var that = this;
      e.preventDefault();
      cloudinary.openUploadWidget(
        {cloud_name: 'gmkohler', upload_preset: 'gtv1su2k'},
        function(error, result) {
          that.setState({
            imageFilename: result["0"].original_filename,
            songImageUrl: result["0"].secure_url
          });
          console.log(error, result);
        }
      );
    },

    openCloudinaryWidgetAudio: function(e) {
      var that = this;
      e.preventDefault();
      cloudinary.openUploadWidget(
        {cloud_name: 'gmkohler', upload_preset: 'eosd46qk'},
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
        image_url: this.state.songImageUrl,
        tag_names: this.state.tagNames
      };

      var onSuccess = function (data) {
        window.location = ('/api/songs/' + data.id)
      };

      SongApiUtil.postSong(songParams, onSuccess);
    },

    addTag: function(e) {
      e.preventDefault();
      var tagName = this.state.tagForm.toLowerCase();
      if (this.state.tagNames.indexOf(tagName)=== -1) {
        this.setState({
          tagNames: this.state.tagNames.concat([tagName]),
          tagForm: ""
        });
      } else {
        this.setState({tagForm: ""});
      }

    },

    removeTag: function(e) {
      e.preventDefault();
      var tagName = e.currentTarget.id,
          newTagNames = this.state.tagNames.slice(),
          idx = newTagNames.indexOf(tagName);
      newTagNames.splice(idx, 1);
      this.setState({tagNames: newTagNames});
    },

    render: function () {
      var tags = this.state.tagNames.map(function(tagName){
        return (
          <div className="index-item-tag">
            <span className="index-item-tag-text">{"# " + tagName}</span>
            <i className="glyphicon glyphicon-remove"
               id={tagName}
               onClick={this.removeTag}></i>
          </div>);
      }.bind(this));

      return (
        <div className="container col-md-4">
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

            <div className="index-item-tag-collection clearfix">
              {tags}
            </div>

            <div className="form-group">
              <input type="text"
                     className="form-control"
                     name="tag[name]"
                     id="tag_name"
                     placeholder="Add a Tag"
                     valueLink={this.linkState("tagForm")}/>
            </div>
            <button onClick={this.addTag}>Create Tag!</button>
          </form>


          <div className="row">
            <div className="col-md-4">
              Select Audio File
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
                <button className="btn btn-xs"
                        id="content_file_url"
                        onClick={this.openCloudinaryWidgetAudio}>Choose File</button>
            </div>
            <div className="col-md-4">
              <label for="content_file_url">{this.state.contentFilename || "No file chosen"}</label>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              Select Image File (optional)
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-xs"
                      id="song_image_url"
                      onClick={this.openCloudinaryWidgetImage}>Choose File</button>
            </div>
            <div className="col-md-4">
              <label for="content_file_url">{this.state.imageFilename || "No file chosen"}</label>
            </div>
          </div>


           <button type="submit"
                   className="btn btn-default"
                   onClick={this.createSong}>Submit</button>
        </div>
     );
    }
  });
}(this));
