# == Schema Information
#
# Table name: users
#
#  id                           :integer          not null, primary key
#  email                        :string           not null
#  password_digest              :string           not null
#  session_token                :string           not null
#  info                         :text
#  follows_id                   :integer
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
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
