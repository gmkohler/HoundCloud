# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models
* Song

### Controllers
* Api::SongsController (create, show, update)
* Api::UsersController (show)

### Views
* users/show.json.jbuilder
* songs/show.json.jbuilder
* songs/new.json.jbuilder

## Flux
### Views (React Components)
* UserIndex
  - UserIndexItem
* UserInfo
* FeedIndex (for activity feed)
  - FeedIndexItem
  - During the construction of my wireframe I realized that the homepage and a user show page differ primarily by which songs are loaded into the feed, leading me to believe that a template-like approach to the Feed is appropriate.
* SongForm

### Stores
* Song
* User

### Actions
* ApiActions.receiveUsers
* ApiActions.receiveUserDetail
  - ApiActions.receiveActivityFeed
* ApiActions.receiveSongDetail

### ApiUtil
* ApiUtil.fetchUsers
* ApiUtil.fetchUserDetail
  - ApiUtil.fetchActivityFeed

* ApiUtil.createSong
* ApiUtil.editSong


## Gems/Libraries
* Flux Dispatcher
* react-rails
* EventEmitter
* Twitter Bootstrap
* Need to find a library for audio uploading.  a/A github suggests Cloudinary or FilePicker.
