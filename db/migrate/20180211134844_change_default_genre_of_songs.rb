class ChangeDefaultGenreOfSongs < ActiveRecord::Migration[5.1]
  def change
    change_column_default :songs, :genre, "none"
  end
end
