class AddAttachmentProfilePictureToUsers < ActiveRecord::Migration[5.1]
  def self.up
    change_table :users do |t|
      t.attachment :profile_picture
      t.attachment :cover
    end
  end

  def self.down
    remove_attachment :users, :profile_picture
    remove_attachment :users, :cover
  end
end
