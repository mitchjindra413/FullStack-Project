class Listing < ApplicationRecord
    validates :owner_id, :city, :zip_code, :state, :country, presence: true
    validates :property_type, presence: true, inclusion: {in: ['Apartment', 'House', 'Guesthouse', 'Hotel'] }
    validates :num_bedrooms, :num_beds, :night_price, :cleaning_fee, numericality: { greater_than_or_equal_to: 0 }
    validates :max_guests, presence: true, numericality: { greater_than_or_equal_to: 1 }
    validates :description, presence: true

    # ['OMG', 'Lakefront', 'Bed & breakfasts', 'Iconic', 'Beachfront', 'Cabins', 'Luxe', 'Mitch']
    # ['Apartment', 'House', 'Guesthouse', 'Hotel']

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User
end
