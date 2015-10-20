class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false
      t.references :taggable, polymorphic: true, index: true, null: false
      t.string :taggable_type, null: false

      t.timestamps null: false
    end

  end
end
