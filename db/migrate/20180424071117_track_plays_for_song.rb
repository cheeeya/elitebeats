class TrackPlaysForSong < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :total_plays, :integer, default: 0
  end
end
