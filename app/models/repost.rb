# == Schema Information
#
# Table name: reposts
#
#  id              :integer          not null, primary key
#  reposter_id     :integer          not null
#  repostable_id   :integer
#  repostable_type :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Repost < ActiveRecord::Base
  belongs_to :repostable, polymorphic: true
  belongs_to :reposter, class_name: "User"
end
