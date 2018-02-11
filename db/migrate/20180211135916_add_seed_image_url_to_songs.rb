class AddSeedImageUrlToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :image_aws_url, :string
  end
end
