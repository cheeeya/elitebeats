class AddIndexToSongsAuthorIdAndPermalink < ActiveRecord::Migration[5.1]
  def change
    add_index :songs, [:author_id, :permalink], unique: true
  end
end
