class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.references :commentable, polymorphic: true, index: true
      t.string :body, null: false
      t.float :comment_time, null: false

      t.timestamps null: false
    end

  end
end
