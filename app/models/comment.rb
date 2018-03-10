class Comment < ApplicationRecord
  belongs_to :song,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: 'Song'

end
