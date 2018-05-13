# == Schema Information
#
# Table name: users
#
#  id                           :integer          not null, primary key
#  email                        :string           not null
#  password_digest              :string           not null
#  session_token                :string           not null
#  bio                          :text
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  profile_url                  :string           not null
#  age                          :integer          not null
#  display_name                 :string           not null
#  profile_picture_file_name    :string
#  profile_picture_content_type :string
#  profile_picture_file_size    :integer
#  profile_picture_updated_at   :datetime
#  cover_file_name              :string
#  cover_content_type           :string
#  cover_file_size              :integer
#  cover_updated_at             :datetime
#  s_prof_pic_url               :string
#  s_cover_url                  :string
#  first_name                   :string
#  last_name                    :string
#  city                         :string
#  country                      :string
#

class User < ApplicationRecord
  validates :email, :password_digest, :profile_url, :session_token, :display_name, :age, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :age, numericality: { greater_than_or_equal_to: 13, message: "must be at least 13 years old" }
  validates :profile_url, :email, uniqueness: true
  has_attached_file :profile_picture,
    default_url: "https://res.cloudinary.com/elitebeats/image/upload/v1518126520/defaultprofile_zl2itc.png",
    path: "/users/images/profile_pictures/:id/original/:basename.:extension"
  has_attached_file :cover,
    default_url: "https://res.cloudinary.com/elitebeats/image/upload/v1518134151/page-background-default_gg8ppn.jpg",
    path: "/users/images/covers/:id/original/:basename.:extension"
  validates_attachment_content_type :profile_picture, :cover, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token, :ensure_profile_url, :ensure_display_name

  attr_reader :password

  has_many :songs,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'Song'

  has_many :comments,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'Comment'

  has_many :follower_follows,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "Follow"

  has_many :followers,
    through: :follower_follows,
    source: :follower

  has_many :following_follows,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: "Follow"

  has_many :followings,
    through: :following_follows,
    source: :following

  has_many :likes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "Like"


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
