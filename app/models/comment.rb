class Comment < ApplicationRecord
  validates :author_id, :song_id, :body, presence: true

  belongs_to :song,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: 'Song'

  belongs_to :author
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'User'

end
