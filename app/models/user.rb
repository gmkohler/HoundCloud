class User < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token!

  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, :email, :session_token, presence: true

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    if user && (user.is_password?(password))
      return user
    else
      return nil
    end
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
