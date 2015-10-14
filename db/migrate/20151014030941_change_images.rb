class ChangeImages < ActiveRecord::Migration
  def change
    drop_table :images
    add_column :users, :image_url, :string, null: false
    add_column :songs, :image_url, :string, null: false

  end
end
