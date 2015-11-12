# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  image_url       :string           not null
#  location        :string           not null
#  bio             :text             not null
#  cover_image_url :string           not null
#

class User < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token!

  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, :email, :session_token, presence: true
  validates :username, :email, uniqueness: true

  has_many :in_follows, class_name: "Following", foreign_key: :followee_id
  has_many :out_follows, class_name: "Following", foreign_key: :follower_id

  has_many :followers, through: :in_follows, source: :follower
  has_many :followees, through: :out_follows, source: :followee

  has_many :likes, foreign_key: :liker_id
  has_many :liked_items, through: :likes, source: :likeable

  has_many :reposts, foreign_key: :reposter_id
  has_many :reposted_items, through: :reposts, source: :repostable

  has_many :songs, foreign_key: :artist_id, dependent: :destroy

  has_many :comments
  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    if user && (user.is_password?(password))
      return user
    else
      return nil
    end
  end

  def self.find_follow_suggestions(current_user_id)
    User.find_by_sql("
      SELECT
        users.*
      FROM
        users
      LEFT OUTER JOIN (
        SELECT
          *
        FROM
          followings
        WHERE
          followings.follower_id = '#{current_user_id}'
      ) AS follows ON follows.followee_id = users.id
      WHERE
        follows.followee_id IS NULL AND users.id != '#{current_user_id}'
    ")
  end

  def self.find_by_search_query(query)
    User.where("users.username LIKE ?", "%#{query}%")
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password_digest = BCrypt::Password.create(password)
    self.password_digest = @password_digest
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def ensure_session_token!
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

end
