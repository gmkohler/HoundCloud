<div className={active} id="modal-form-contents">
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
      <div><label>Tags:</label></div>  {tags}
    </div>

    <div className="form-group">
      <input type="text"
             className="form-control"
             name="tag[name]"
             id="tag_name"
             placeholder="Add a Tag <'return' to submit>"
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
