class AddIndexToFollow < ActiveRecord::Migration[5.1]
  def change
    add_index :follows, [:user_id, :follower_id], unique: true
    add_index :follows, [:follower_id, :user_id], unique: true
  end
end
