# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  info            :text
#  follows_id      :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  profile_url     :string           not null
#  age             :integer          not null
#  display_name    :string           not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
