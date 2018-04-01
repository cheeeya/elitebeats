class ChangeFollowsIdToFollowingId < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :follows_id, :following_id
  end
end
