class RemoveSongFileFromSongs < ActiveRecord::Migration[5.1]
  def change
    remove_attachment :songs, :song_file
  end
end
