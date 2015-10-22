json.extract! user, :id, :username, :image_url
json.set! :numTracks, user.songs.size
json.set! :numFollowers, user.followers.size
json.set! :numFollowing, user.followees.size

if user.followers.include?(current_user)
  json.isFollowed true
else
  json.isFollowed false
end
