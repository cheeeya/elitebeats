class ChangeImageAwsUrlColumnNameOfSongs < ActiveRecord::Migration[5.1]
  def change
    remove_column :songs, :image_aws_url
    add_column :songs, :seed_image_url, :string
  end
end
