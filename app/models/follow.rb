# == Schema Information
#
# Table name: follows
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  follower_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Follow < ApplicationRecord
  validates :user_id, :follower_id, presence: true
  
  belongs_to :following,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :follower,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: 'User'
end
