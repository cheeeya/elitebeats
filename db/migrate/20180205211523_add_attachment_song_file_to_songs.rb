class AddAttachmentSongFileToSongs < ActiveRecord::Migration[5.1]
  def self.up
    change_table :songs do |t|
      t.attachment :song_file
    end
  end

  def self.down
    remove_attachment :songs, :song_file
  end
end
