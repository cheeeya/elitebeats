class RemoveFollowingIdFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :following_id, :integer
  end
end
