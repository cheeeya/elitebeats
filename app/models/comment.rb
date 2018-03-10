class Comment < ApplicationRecord
  belongs_to :song,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: 'Song'

  belongs_to :author
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'User'

end
