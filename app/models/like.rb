class Like < ApplicationRecord
  validates :user_id, :song_id, presence: true
  validates :song_id, uniqueness: { scope: :user_id }
  validates :user_id, uniqueness: { scope: :song_id }

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :song,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: 'Song'

end
