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
#  total_plays           :integer          default(0)
#

require 'test_helper'

class SongTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
