json.extract! song, :id, :title, :content_url, :image_url, :artist_id, :created_at
json.set! :artist_username, artist.username
json.set! :artist_id, artist.id
json.set! :tags, song.tags
