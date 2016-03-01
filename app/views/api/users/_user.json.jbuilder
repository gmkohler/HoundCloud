json.extract! user, :id, :username, :location, :image_url, :cover_image_url, :bio
json.set! :numTracks, user.songs.size
json.set! :numFollowers, user.followers.size
json.set! :numFollowing, user.followees.size
json.set! :isFollowed, user.followers.include?(current_user)
