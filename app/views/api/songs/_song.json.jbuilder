json.extract! song, :id, :title, :content_url, :image_url, :artist_id, :created_at
json.set! :artist_username, artist.username
json.set! :artist_id, artist.id
json.set! :tags, song.tags
json.comments(song.comments) do |comment|
  json.body comment.body
  json.commentID comment.id
  json.commentTime comment.comment_time
  json.author do
    json.id comment.user.id
    json.username comment.user.username
    json.imageUrl comment.user.image_url
  end
end

json.set! :numLikes, song.likers.length
json.set! :numReposts, song.reposters.length
json.set! :reposters, Hash[song.reposters.map{|reposter| [reposter.id, true]}]
json.set! :isLiked, song.likers.include?(current_user)
json.set! :isReposted, song.reposters.include?(current_user)
json.set! :isSubscribed, (artist.followers.include?(current_user) ||
                            !((song.reposters & current_user.followees).empty?))
