# Phase 3: Playback and seeding (2 days)

## Rails
### Models

### Controllers

### Views

## Flux

### Views (React Components)
* PlaybackBar
* PlaybackBarIndex (i.e., queue)
* PlaybackBarIndexItem (i.e., queued song)

### Stores
* I anticipate modifying the SongStore to also keep track of a playlist queue--it doesn't make sense to have two stores for the same model. However, I will research whether this is the preferred practice in Flux and update this strategy accordingly. If the separate collection within the SongStore is appropriate, the songs to be added to the queue should already be included in the song store, so adding to a \_queuedSongs collection may include slicing from the \_songs collection.

### Actions
* ApiActions.addSongsToQueue
  - I don't foresee this needing the API as the song will be present in the store at the time the user starts a playback queue.  Rather I see adding one song as adding all of the rest of the songs in the feed to the queue at the same time.
* ApiActions.receiveQueuedSongData
* ApiActions.startQueuePlayback
* ApiActions.stopQueuePlayback

### ApiUtil
* ApiUtil.fetchQueuedSong
  - I need to research strategies for loading songs while maintaining fast navigation of the site.  One idea is to fetch queued songs one after the other, or to wait to fetch the data until the song is next up in the queue.

## Gems/Libraries
* At present I am unfamiliar with the audio library landscape, but I will need to identify a library for audio playback and integrate this with a queue implementation.
