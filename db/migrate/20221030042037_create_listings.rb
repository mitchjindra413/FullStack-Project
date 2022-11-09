class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.string :street_address, null: false
      t.string :apt
      t.string :city, null: false, index: true
      t.string :zip_code, null: false
      t.string :state, null: false, index: true
      t.string :country, null: false, index: true
      t.float :lat, null: false
      t.float :long, null: false 
      t.string :tags, default: ''
      t.string :property_type, null: false
      t.integer :max_guests, null: false
      t.integer :night_price, null: false
      t.integer :cleaning_fee, null: false
      t.text :description, null: false
      t.integer :num_bedrooms, null: false
      t.integer :num_beds, null: false
      t.integer :num_baths, null: false
      t.string :amenities, default: ''
      t.string :tag_line, null: false
      t.timestamps
    end
  end
end
