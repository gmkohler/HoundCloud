# HoundCloud

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

HoundCloud is a web application inspired by SoundCloud built using Ruby on Rails and React.js. HoundCloud allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Upload and tag songs
- [ ] Listen to songs while navigating the site
- [ ] Search songs by tag
- [ ] Subscribe to other users, have a "subscription feed"
- [ ] Like songs
- [ ] Comment on songs at a specified time within the song.
- [ ] View index for collections of subscribed users, uploaded songs, liked songs.


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Song Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up the JSON APIs for Songs.

[Details][phase-one]

### Phase 2: Flux Architecture for songs (1.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view structure for the main application. After the basic Flux architecture has been set up, a Song store will be implemented and a set of actions corresponding to the needed CRUD functionality created.  This phase will include finding a library with which I can manage the uploading and accessing of mp3s.  This phase will include creating a song form, which will allow the user to name their songs and indicate a local file path from which to upload the song.  Users can also edit the titles of their songs.

[Details][phase-two]

### Phase 3: User  and user 'show' page (1 day)
Once this is done, I will create React views for the Songs `Index` and `IndexItem` for the user. At the end of Phase 3, users can search for and view other user pages and can see their activity feeds (at this point, just the songs they have uploaded). Lastly, while constructing the views I will start using basic bootstrap for styling.

[Details][phase-three]

### Phase 4: Playback and further seeding (1.5 days)

Phase 3 will concern establishing a queue for playback.  The playback queue will be 'navbar'-esque in that it will always be rendered while the user navigates the app.  Users can click on a song and the rest of the songs in the current feed will be added to the playback queue.

I will create a few more user and songs so that I am ready to work on phase 4.

[Details][phase-four]

### Phase 5: Subscription feed: populating the landing page (1 day)

Phase 4 allows the user to subscribe to other users. This will include updating the flux architecture so that the SongStore can fetch all songs for the current user's subscription feed (i.e., the union of followees' activity feeds, ordered chronologically).  The subscription feed acts as the landing page/home page for a logged-in user.

[Details][phase-five]

### Phase 6: Beautify (1.5 days)

Over the weekend I will work on CSS for all that has been done thus far.  This will involve heavy apeing (gorilla-ing?) of the soundcloud aesthetic, including coloring and transitions.  I also hope to achieve the "waveform" type look on the views for the songs, which may include a library.

[Details][phase-six]

### Phase 7: Tags (1 days)

Users can tag songs.  Tagged songs will show up in the user's activity feed.  Both the upload and the edit views will allow for taggings.  Users will be able to create new tags.

The search will be fleshed out to provide results for tags and songs, in addition to the previously-implemented user results.

[Details][phase-seven]

### Phase 8: Collections (1 Day)

Collections will be established in this phase.  Collections is a view that includes indexes for each of liked songs, followed users, and songs that the user has uploaded. A Tags index may also be implemented, in which a specified TagsIndexItem links to a 'show all' view for all taggings belonging to said tag.

[Details][phase-eight]

### Phase 9: Comments (1 day)

Users can comment on songs.  The comment form will be a child of an IndexItem component (i.e., of one song in a feed) and will be rendered along the "time axis" of the song at the point in which it was commented.  Mouseover will display the whole comment, otherwise it will be displayed with the user's avatar.

[Details][phase-nine]

### Phase 10: Re-beautify (1 day)

Work on CSS again for the entire product

[Details][phase-ten]


### Bonus Features (TBD)
- [ ] Re-post songs from other users
- [ ] Create playlists, establish polymorphism for "likeables", "taggables" with respect to both playlists and songs.
- [ ] Establish a home page for not-logged-in users, and routing the new user/session pages through this.
- [ ] Implement suggested Users/Songs navbar on the side of show pages
- [ ] Download songs
- [ ] User can manage playback queue (e.g., splicing after the current song and dragging songs around within the queue)
- [ ] Playback audio manipulation (e.g., equalizer)
- [ ] Multi-staged feed retrieval to achieve quicker initial page load

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md
[phase-ten]: ./docs/phases/phase10.md
