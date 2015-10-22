json.extract! song, :id, :title, :content_url, :image_url, :artist_id, :created_at
json.set! :artist_username, artist.username
json.set! :artist_id, artist.id
json.set! :tags, song.tags
json.set! :numLikes, song.likes.size
json.set! :isLiked, song.likers.include?(current_user)
json.set! :isReposted, song.reposters.include?(current_user)
json.set! :reposters, Hash[song.reposters.map{|reposter| [reposter.id, true]}]
