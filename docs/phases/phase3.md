# Phase 3: Users(1 days)

## Rails
### Models

### Controllers
* Api::UsersController (show)

### Views
* users/show.json.jbuilder

## Flux
### Views (React Components)
* UserIndex
  - UserIndexItem
* UserInfo
* FeedIndex (for activity feed)
  - FeedIndexItem
  - During the construction of my wireframe I realized that the homepage and a user show page differ primarily by which songs are loaded into the feed, leading me to believe that a template-like approach to the Feed is appropriate.

### Stores
* User

### Actions
* ApiActions.receiveUsers
* ApiActions.receiveUserDetail
  - ApiActions.receiveActivityFeed

### ApiUtil
* ApiUtil.fetchUsers
* ApiUtil.fetchUserDetail
  - ApiUtil.fetchActivityFeed


## Gems/Libraries
