class AddAgeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :age, :integer, null: false
    add_column :users, :display_name, :string, null: false
  end
end
