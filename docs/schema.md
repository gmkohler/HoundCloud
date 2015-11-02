# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
image_url       | string    | not null
cover_image_url | string    | not null
location        | string    | not null
bio             | text      | not null

## songs
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    | not null
content_url  | string    | not null
image_url    | string    | not null
artist_id    | integer   | not null, foreign key (references users), indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, unique

## taggings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
tag_id        | integer   | not null, foreign key (references tags),
taggable_id   | integer   | not null, foreign key (references taggable),
taggable_type | integer   | not null, foreign key, unique [tag_id, taggable_id], inclusion ['Songs']

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
likable_type | string    | not null (references users), unique [user_id, likable_id], inclusion ['Songs']

## reposts
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
reposter_id     | integer   | not null, foreign key (references users)
repostable_id   | integer   | not null, foreign key (references repostable)
repostable_type | string    | not null (references users), unique [user_id, repostable_id], inclusion ['Songs']

## comments
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users)
commentable_id   | integer   | not null, foreign key (references commentable)
commentable_type | string    | not null (references users), unique [user_id, commentable_id], inclusion ['Songs']
body             | string    | not null
comment_time     | float     | not null
