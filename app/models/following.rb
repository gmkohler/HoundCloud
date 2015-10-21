# == Schema Information
#
# Table name: followings
#
#  id          :integer          not null, primary key
#  followee_id :integer          not null
#  follower_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Following < ActiveRecord::Base
  validates :followee, :follower, presence: true
  validates :follower, uniqueness: { scope: :followee }

  belongs_to :follower, class_name: "User"
  belongs_to :followee, class_name: "User"
  def self.find_relevant_followings(user_id)
    Following.where("follower_id = #{user_id} OR followee_id = #{user_id}");
  end
end
