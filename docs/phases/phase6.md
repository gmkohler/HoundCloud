# Phase 6: Likes, Tags, and Collections

## Rails
### Models
* Likings
* Taggings
* Tags
* Songs (new query methods based on taggings join table)

### Controllers
* Api::TagController (create, destroy)
* Api::SongsController (Invoke the aforementioned new query methods)

### Views

## Flux
### Views (React Components)
* Collection
* CollectionIndex
* CollectionIndexItem
* TaggingIndex
* TaggingIndexItem
* Update ActivityFeedIndex to include liked songs.

### Stores
* Tag
* May update SongStore to include a \_taggings store

### Actions
  - addTaggingToSong
  - addLikingtoSong
  - fetchLikedSongs
  - fetchTags
  - fetchTagging

### ApiUtil
* ApiUtil.createTag
* ApiUtil.createTagging
* ApiUtil.destroyTagging
* ApiUtil.createLiking
* ApiUtil.destroyLiking
* Update the fetchActivityFeed to include liked songs.

## Gems/Libraries
