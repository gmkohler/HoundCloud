class Repost < ActiveRecord::Base
  belongs_to :repostable, polymorphic: true
  belongs_to :reposter, class_name: "User"
end
