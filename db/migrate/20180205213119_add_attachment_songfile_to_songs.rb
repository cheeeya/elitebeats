class AddAttachmentSongfileToSongs < ActiveRecord::Migration[5.1]
  def self.up
    change_table :songs do |t|
      t.attachment :songfile
    end
  end

  def self.down
    remove_attachment :songs, :songfile
  end
end
