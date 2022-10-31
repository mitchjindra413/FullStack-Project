class Listing < ApplicationRecord
    validate :owner_id, :city, :zip_code, :state_province, :country, presence: true
    validate :address, presence: true, uniqueness: true
    validate :tags, inclusion: {in: unique_types}
    validate :property_type, presence: true,  inclusion: {in: property_types}
    validate :num_bedrooms, :num_beds, :night_price, :cleaning_fee, numericality: { greater_than_or_equal_to: 0 }
    validate :max_guests, presence: true, numericality: { greater_than_or_equal_to: 1 }
    validate :description, presence: true

    const unique_types = ['OMG', 'Lakefront', 'Bed & breakfasts', 'Iconic', 'Beachfront', 'Cabins', 'Luxe', 'Mitch']
    cosnt property_types = ['Apartment', 'House', 'Guesthouse', 'Hotel']

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :user
end
