# == Schema Information
#
# Table name: songs
#
#  id                    :integer          not null, primary key
#  title                 :string           not null
#  genre                 :string           default("none")
#  description           :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  image_file_name       :string
#  image_content_type    :string
#  image_file_size       :integer
#  image_updated_at      :datetime
#  author_id             :integer          not null
#  songfile_file_name    :string
#  songfile_content_type :string
#  songfile_file_size    :integer
#  songfile_updated_at   :datetime
#  aws_url               :string
#  permalink             :string           not null
#  seed_image_url        :string
#

class Song < ApplicationRecord
  validates :title, :author_id, :permalink, presence: true
  validates :permalink, uniqueness: { scope: :author_id }
  has_attached_file :image,
    default_url: "https://res.cloudinary.com/elitebeats/image/upload/v1518134441/default_album_kynclq.png",
    path: "/songs/images/:id/original/:basename.:extension"
  has_attached_file :songfile, path: "/songs/songfiles/:id/original/:basename.:extension"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates_attachment :songfile,
    content_type: { content_type: ["audio/mp3", "audio/mpeg", "audio/mpeg3", "audio/x-m4a", "audio/wav"] }

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'User'

  has_many :comments,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: 'Comment'

end
