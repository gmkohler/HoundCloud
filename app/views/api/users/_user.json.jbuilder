json.extract! user, :id, :username, :image_url

if user.followers.include?(current_user)
  json.isFollowed true
else
  json.isFollowed false
end
