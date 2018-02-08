# == Schema Information
#
# Table name: songs
#
#  id                    :integer          not null, primary key
#  title                 :string           not null
#  genre                 :string           default("None")
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
#

class Song < ApplicationRecord
  validates :title, :author_id, :permalink, presence: true
  has_attached_file :image,
    default_url: "https://res.cloudinary.com/elitebeats/image/upload/v1517883350/default_f207ry.jpg",
    path: "/songs/images/:id/original/:basename.:extension"
  has_attached_file :songfile, path: "/songs/songfiles/:id/original/:basename.:extension"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :songfile, content_type: ['audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/mpeg3']

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'User'

end
