class RemoveUsernameFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :username
    add_column :users, :profile_url, :string, null: false
    add_index :users, :profile_url, unique: true
  end
end
