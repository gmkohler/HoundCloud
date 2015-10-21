# == Schema Information
#
# Table name: songs
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  content_url :string           not null
#  image_url   :string           not null
#  artist_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Song < ActiveRecord::Base
  belongs_to :artist, class_name: :User, foreign_key: :artist_id
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  
  has_many :likes, as: :likeable
  has_many :likers, through: :likes

  def self.filter(filter_params)
    if filter_params[:home] == "true"
      user_id = filter_params[:id]
      Song.includes(:artist)
          .joins("INNER JOIN followings ON songs.artist_id = followings.followee_id")
          .where("followings.follower_id = ?", user_id)
          .order(created_at: :desc)
    else
      artist_id = filter_params[:id]
      Song.includes(:artist)
          .where("songs.artist_id = #{artist_id}")
          .order(created_at: :desc)
    end
  end

  def self.find_by_tag_id(tag_id)
  end

  def assign_tags(tag_names)
    tag_names.each {|tag_name| self.tags << Tag.find_or_create_by({name: tag_name})}
  end

  # think about after_creation thing, reference a constant to the twitter egg.
end
