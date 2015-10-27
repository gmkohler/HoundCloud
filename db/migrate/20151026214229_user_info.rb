class UserInfo < ActiveRecord::Migration
  def change
    add_column :users, :location, :string, null: false
    add_column :users, :bio, :text, null: false
    add_column :users, :cover_image_url, :string, null: false
    
  end
end
