# == Schema Information
#
# Table name: likes
#
#  id            :integer          not null, primary key
#  liker_id      :integer          not null
#  likeable_id   :integer
#  likeable_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Like < ActiveRecord::Base
  belongs_to :likeable, polymorphic: true
  belongs_to :liker, class_name: "User"
end
