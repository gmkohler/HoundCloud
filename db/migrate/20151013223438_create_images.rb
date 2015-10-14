class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image_url, null: false
      t.integer :imageable_id, null: false
      t.string :imageable_type, null: false

      t.timestamps null: false
    end

    add_index :images, [:imageable_id, :imageable_type], unique: true
  end
end
