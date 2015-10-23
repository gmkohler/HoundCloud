/* global React */
/* global cloudinary */
(function(root) {
  'use strict';
  root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {songTitle: "", tagNames: [], tagForm: ""};
    },

    componentWillReceiveProps: function (newProps) {
      var song = newProps.song;
      if (song.id) {
        var tagNames = song.tags.map(function(tag) {
          return tag.name;
        });
        this.setState({songTitle: song.title, tagNames: tagNames});
      }
    },

    clearState: function () {
      this.setState({songTitle: "", tagNames: [], tagForm: ""});
    },

    deactivate: function (e) {
      if (e) {
        e.preventDefault();
      }
      this.clearState();
      ModalActions.deactivateSongFormModal();
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

    _songParams: function () {
      return ({
        title: this.state.songTitle,
        content_url: this.state.songContentUrl,
        image_url: this.state.songImageUrl,
        tag_names: this.state.tagNames
      });
    },

    createSong: function (e) {
      var songParams = this._songParams();
      var onSuccess = function (data) {
        SongApiActions.receiveSingleSong(data);
        ModalActions.deactivateSongFormModal();
      };

      this.clearState();
      SongApiUtil.postSong(songParams, onSuccess);
    },

    updateSong: function (e) {
      var songParams = this._songParams();
      var onSuccess = function (data) {
        SongApiActions.receiveSingleSong(data);
        ModalActions.deactivateSongFormModal();
      };

      SongApiUtil.updateSong(this.props.song.id, songParams, onSuccess);
    },

// need to listen on container not on tag form for escape key
    keyUpHandler: function (e) {
      e.preventDefault();
      var RETURN_KEY_CODE = 13,
             TAB_KEY_CODE = 9,
             ESC_KEY_CODE = 27;
      if (e.keyCode === RETURN_KEY_CODE || e.keyCode === TAB_KEY_CODE) {
        this.addTag();
      } else if (e.keyCode === ESC_KEY_CODE) {
        this.deactivate();
      }
    },

    addTag: function() {
      var tagName = this.state.tagForm.toLowerCase();
      if (tagName && this.state.tagNames.indexOf(tagName)=== -1) {
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
      // choose submit action based on state
      var active = this.props.active ? "modal-active" : null;
      var edit = !!this.props.song.id;

      var headerText = edit ? "Edit Tags" : "Upload a Song";
      var submitButtonAction = edit ? this.updateSong : this.createSong;
      var submitButtonText = edit ? "Update" : "Submit";

      var tags = this.state.tagNames.map(function(tagName){
        return (
          <div className="form-tag">
            <span className="form-tag-text">{"# " + tagName}</span>
            <i className="glyphicon glyphicon-remove"
               id={tagName}
               onClick={this.removeTag}></i>
          </div>);
      }.bind(this));

      var audioButton = (
        <button className="btn btn-xs"
                id="content_file_url"
                onClick={this.openCloudinaryWidgetAudio}>Choose File</button>
      );

      var titleForm = (
        <div className="form-group col-lg-8">
        <label for="song_title">Title</label>
        <input type="text"
               className="form-control"
               name="song[title]"
               id="song_title"
               valueLink={this.linkState("songTitle")}/>
        </div>
      );

      return (
        <div className={active} id="modal-overlay"
             onKeyUp={this.keyUpHandler}>
          <div className={active} id="modal-form-container">
            <div className={active}
                 id="modal-form-contents">
              <div className="form-exit">
                <i className="glyphicon glyphicon-remove"
                   onClick={this.deactivate}/>
              </div>

              <div className="page-header"><h3>{headerText}</h3></div>
              <form className="clearfix">
                {this.props.edit ? null : titleForm}


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
                           onKeyUp={this.keyUpHandler}
                           placeholder="Add a Tag! (return or tab to submit)"
                           valueLink={this.linkState("tagForm")}/>
                  </div>

                </div>
              </form>

              <div className="container">
                  <span className="file-upload-header">Select Audio File</span>
              </div>
              <div className="container">
                {this.props.edit ? null : audioButton}
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
                          onClick={submitButtonAction}>
                          {submitButtonText}
                  </button>
                </div>
              </div>


            </div>


          </div>
        </div>
     );
    }
  });
}(this));
