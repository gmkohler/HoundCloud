class CreateFollowings < ActiveRecord::Migration
  def change
    create_table :followings do |t|
      t.integer :followee_id, null: false
      t.integer :follower_id, null: false

      t.timestamps null: false
    end
    
    add_index :followings, [:followee_id, :follower_id], unique: true
  end
end
