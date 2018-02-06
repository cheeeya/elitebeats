class RemoveUrlAndAddPathToSongs < ActiveRecord::Migration[5.1]
  def change
    remove_column :songs, :url
    add_column :songs, :aws_path, :string
  end
end
