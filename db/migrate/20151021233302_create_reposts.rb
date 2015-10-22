class CreateReposts < ActiveRecord::Migration
  def change
    create_table :reposts do |t|
      t.integer :reposter_id, null: false
      t.references :repostable, polymorphic: true, index: true

      t.timestamps null: false
    end

    add_index :reposts, :reposter_id
  end
end
