# Phase 7 Likes, Tags, and Collections

## Rails
### Models
* Taggings
* Tags
* Songs (new query methods based on taggings join table)

### Controllers
* Api::TagController (create, destroy)
* Api::SongsController (Invoke the aforementioned new query methods)

### Views

## Flux
### Views (React Components)
* TaggingIndex
* TaggingIndexItem

### Stores
* Tag
* May update SongStore to include a \_taggings store

### Actions
  - addTaggingToSong

### ApiUtil
* ApiUtil.createTag
* ApiUtil.createTagging
* ApiUtil.destroyTagging

## Gems/Libraries
