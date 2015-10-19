json.extract! user, :id, :username, :image_url
json.isFollowed current_user.followees.include?(user)

if current_user.followees.include?(user)
  json.followingID current_user.out_follows.find_by_followee_id(user.id).id
end
