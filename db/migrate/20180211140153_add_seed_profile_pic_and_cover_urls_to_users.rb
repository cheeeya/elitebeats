class AddSeedProfilePicAndCoverUrlsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :s_prof_pic_url, :string
    add_column :users, :s_cover_url, :string
  end
end
