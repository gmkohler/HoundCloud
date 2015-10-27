# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  commentable_id   :integer
#  commentable_type :string
#  body             :string           not null
#  comment_time     :float            not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :song
end
