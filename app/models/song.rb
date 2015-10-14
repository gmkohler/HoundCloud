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

  def self.get_songs_with_artist(artist_id)
    Song.includes(:artist).where(artist_id: artist_id)
  end
  # think about after_creation thing, reference a constant to the twitter egg.
end
