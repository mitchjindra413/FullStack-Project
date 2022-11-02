class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :listing, null: false, foreign_key: true
      t.integer :num_guests, null: false
      t.date :start_date, null: false, index: {unique: true}
      t.date :end_date, null: false, index: {unique: true}
      t.timestamps
    end
  end
end
