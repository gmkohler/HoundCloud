class Songs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.string :content_url, null: false

      t.integer :artist_id, null: false
      t.timestamps null: false
    end

    add_index :songs, :artist_id, unique: :title
  end
end
