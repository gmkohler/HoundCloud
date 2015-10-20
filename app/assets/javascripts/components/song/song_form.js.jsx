/* global React */
/* global cloudinary */
(function(root) {
  'use strict';
  root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {active: true, songTitle: "", tagNames: [], tagForm: ""};
    },

    componentWillReceiveProps: function (newProps) {},

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
        SongApiUtil.receiveNewSong(data);
        this.closeForm();
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

    closeForm: function () {
      this.setState({active: false});
    },

    render: function () {
      // choose submit action based on state
      var tags = this.state.tagNames.map(function(tagName){
        return (
          <div className="form-tag">
            <span className="form-tag-text">{"# " + tagName}</span>
            <i className="glyphicon glyphicon-remove"
               id={tagName}
               onClick={this.removeTag}></i>
          </div>);
      }.bind(this));

      var active = this.state.active ? "modal-active" : ""

      return (
        <div className={active} id="modal-overlay">
          <div className={active} id="modal-form-container">
            <div className={active} id="modal-form-contents">
              <div className="form-exit" onClick={this.closeForm}>
                <i className="glyphicon glyphicon-remove"
                   onClick={this.removeTag}></i>
              </div>

              <div className="page-header"><h3>Upload a song</h3></div>
              <form className="clearfix">
                <div className="form-group col-lg-8">
                  <label for="song_title">Title</label>
                  <input type="text"
                         className="form-control"
                         name="song[title]"
                         id="song_title"
                         valueLink={this.linkState("songTitle")}/>
                </div>


                <div className="form-group">
                  <div className="index-item-tag-collection form-tag-collection clearfix">
                    <div className="tag-header">
                      <span className="file-upload-header">Tags:</span>
                    </div>
                     {tags}
                  </div>
                  <div className="col-lg-5">
                    <input type="text"
                           className="form-control input-sm"
                           name="tag[name]"
                           id="tag_name"
                           placeholder="Add a Tag!"
                           valueLink={this.linkState("tagForm")}/>
                  </div>
                  <button onClick={this.addTag}>Create Tag!</button>
                </div>
              </form>

              <div className="container">
                  <span className="file-upload-header">Select Audio File</span>
              </div>
              <div className="container">
                    <button className="btn btn-xs"
                            id="content_file_url"
                            onClick={this.openCloudinaryWidgetAudio}>Choose File</button>
                          <label className="file-upload-label file-upload-header-help-text"
                                 for="content_file_url">
                    {this.state.contentFilename || "No file chosen"}
                  </label>
              </div>

              <div className="container">
                  <span className="file-upload-header">Select Image File</span>
                  <span className="file-upload-header-help-text">(optional)</span>
              </div>

              <div className="container">
                  <button className="btn btn-xs"
                          id="song_image_url"
                          onClick={this.openCloudinaryWidgetImage}>Choose File</button>
                        <label className="file-upload-label file-upload-header-help-text"
                               for="song_image_url">
                    {this.state.imageFilename || "No file chosen"}
                  </label>
              </div>

              <div className="container">
                <div className="btn-submit-container">
                  <button type="submit"
                          className="btn btn-default btn-form-submit"
                          onClick={this.createSong}>Submit</button>
                </div>
              </div>


            </div>


          </div>
        </div>
     );
    }
  });
}(this));
