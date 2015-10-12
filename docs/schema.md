# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## songs
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
<!-- (re: below) I don't yet know how to store mp3s in a database!! -->
content_path | string    | not null
title        | string    | not null
artist_id    | integer   | not null, foreign key (references users), indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
tag_id        | integer   | not null, foreign key (references tags),
taggable_id   | integer   | not null, foreign key (references taggable),
<!-- taggable_type | integer   | not null, foreign key, unique [tag_id, taggable_id], inclusion ['playlists', 'songs'] -->

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users)
followee_id | integer   | not null, foreign key (references users), unique [follower_id]

## likings
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
user_id      | integer   | not null, foreign key (references users)
likable_id   | integer   | not null, foreign key (references likeable)
<!-- likable_type | string    | not null (references users), unique [user_id, likable_id], inclusion [playlists, songs] -->

## images
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
path           | string    | not null
imageable_id   | integer   | not null, foreign key (references imageable),
imageable_type | string    | not null, unique [imageable_id, path]

<!-- Bonus Features -->
<!-- I am considering these distinct from playlist comments
    due to the ability for them to be positioned at a particular point
    within the song.   -->
## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
curator_id  | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | text      |

## listings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
song_id     | integer   | not null, foreign key (references songs)
playlist_id | integer   | not null, foreign key (references playlists)

## playlist_comments
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
user_id        |
playlist_id        | string    | not null, foreign key (references )
