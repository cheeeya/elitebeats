# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  info            :text
#  follows_id      :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :email, :password_digest, :profile_url, :session_token, :display_name, :age, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :age, numericality: { greater_than_or_equal_to: 13 }

  after_initialize :ensure_session_token, :ensure_profile_url, :ensure_display_name

  attr_reader :password

  def self.user_exists? (identifier)
    !!User.find_by_identifier(identifier)
  end

  def self.find_by_identifier(identifier)
    if identifier.include? ('@')
      user = User.find_by(email: identifier)
    else
      user = User.find_by(profile_url: identifier)
    end
    user
  end

  def self.find_by_credentials(identifier, password)
    @user = User.find_by_identifier(identifier)
    @user && @user.is_password?(password) ? @user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    set_unique_session_token
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    set_unique_session_token unless !self.new_record? || self.session_token
  end

  def ensure_profile_url
    set_unique_profile_url unless !self.new_record? || self.profile_url
  end

  def ensure_display_name
    display_name = self.profile_url.split("-").join(" ").capitalize
    self.display_name ||= display_name
  end

  def set_unique_session_token
    new_session_token = generate_session_token
    while (User.find_by(session_token: new_session_token))
      new_session_token = generate_session_token
    end
    self.session_token = new_session_token
  end

  def set_unique_profile_url
    new_profile_url = 'user-' + generate_random_number.to_s
    while (User.find_by(profile_url: new_profile_url))
      new_profile_url = 'user-' + generate_random_number.to_s
    end
    self.profile_url = new_profile_url
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def generate_random_number
    Random.rand(0..999999999)
  end
end
