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

  has_many :reposts, as: :repostable
  has_many :reposters, through: :reposts

  has_many :comments, as: :commentable

  def self.filter(filter_params)
    if filter_params[:context] == "home"
      user_id = filter_params[:context_data][:id]
      songs = Song.includes(:tags, :likers, artist: [:followers], reposters: [:followers], comments: [:user])
          .joins("INNER JOIN followings ON songs.artist_id = followings.followee_id")
          .where("followings.follower_id = ?", user_id)
          .order(created_at: :desc)
    elsif filter_params[:context] == "show"
      artist_id = filter_params[:context_data][:id]
      Song.includes(:tags, :likers, artist: [:followers], comments: [:user])
          .joins("LEFT OUTER JOIN (
                    SELECT
                      reposts.repostable_id AS song_id, reposts.reposter_id AS reposter_id
                    FROM
                      reposts
                    INNER JOIN
                      users ON users.id = reposts.reposter_id
                  ) AS repostings ON repostings.song_id = songs.id")
          .where("songs.artist_id = ? OR repostings.reposter_id = ?", artist_id, artist_id)
          .order(created_at: :desc)
    elsif filter_params[:context] == "search"
      query = filter_params[:context_data]
      Song.includes(:artist)
          .joins("INNER JOIN users ON songs.artist_id = users.id")
          .where("LOWER(songs.title) LIKE ? OR LOWER(users.username) LIKE ?", "%#{query}%", "%#{query}%")
    end
  end

  def self.find_by_tag_id(tag_id)
  end

  def assign_tags(tag_names)
    tag_names.each {|tag_name| self.tags << Tag.find_or_create_by({name: tag_name})}
  end

  # think about after_creation thing, reference a constant to the twitter egg.
end
