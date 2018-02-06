class CreateSongs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.string :genre, default: "None"
      t.string :description
      t.timestamps
    end
  end
end
