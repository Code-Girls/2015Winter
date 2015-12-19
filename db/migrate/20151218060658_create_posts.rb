class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :filmid
      t.string :title
      t.text :comment
      t.float :rating

      t.timestamps null: false
    end
  end
end
