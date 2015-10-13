# Phase 4: Playback and seeding (2 days)

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
* Queue.  Also goes through the Song controlller.

### Actions
* ApiActions.addSongsToQueue
  - I don't foresee this needing the API as the song will be present in the store at the time the user starts a playback queue.  This action may go directly to the dispatcher, and a queue store will be loaded based on the song store.  I see adding one song as adding all of the rest of the songs in the feed to the queue at the same time.
* ApiActions.receiveQueuedSongData
* ApiActions.startQueuePlayback
* ApiActions.stopQueuePlayback

### ApiUtil
* ApiUtil.fetchQueuedSong
  - I need to research strategies for loading songs while maintaining fast navigation of the site.  One idea is to fetch queued songs one after the other, or to wait to fetch the data until the song is next up in the queue.

## Gems/Libraries
* At present I am unfamiliar with the audio library landscape, but I will need to identify a library for audio playback and integrate this with a queue implementation.
