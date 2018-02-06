class AddUrlToSongs < ActiveRecord::Migration[5.1]
  def change
    remove_column :songs, :aws_path
    add_column :songs, :aws_url, :string
  end
end
