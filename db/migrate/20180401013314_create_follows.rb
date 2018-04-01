class CreateFollows < ActiveRecord::Migration[5.1]
  def change
    create_table :follows do |t|
      t.integer :user_id, null: false
      t.integer :follower_id, null: false
      t.timestamps
    end
  end
end
