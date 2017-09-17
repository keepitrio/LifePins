class CreatePostings < ActiveRecord::Migration[5.1]
  def change
    create_table :postings do |t|
      t.string :name, null: false
      t.string :contact
      t.string :latitude, null: false
      t.longitude :longitude, null: false
      t.text :categories, null: false
      t.integer :number_of_people, null: false

      t.timestamps
    end
  end
end
