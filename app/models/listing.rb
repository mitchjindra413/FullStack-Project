class Listing < ApplicationRecord
    validates :owner_id, :city, :zip_code, :state, :country, presence: true
    validates :property_type, presence: true, inclusion: {in: ['Apartment', 'House', 'Guest suite', 'Hotel', 'Private room', 'Condo', 'Flat'] }
    validates :num_bedrooms, :num_beds, :night_price, :cleaning_fee, numericality: { greater_than_or_equal_to: 0 }
    validates :max_guests, presence: true, numericality: { greater_than_or_equal_to: 1 }
    validates :description, presence: true
    validates :tag_line, presence: true, length: { maximum: 100 }

    # ['OMG', 'Lakefront', 'Bed & breakfasts', 'Iconic', 'Beachfront', 'Cabins', 'Luxe', 'Mitch']

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_many :reservations,
        dependent: :destroy
    
    has_many_attached :photos,
        dependent: :destroy

    has_many :reviews,
        dependent: :destroy

    def avg_total_review
        return 'NA' if self.reviews.length == 0

        total_sum = 0

        self.reviews.each do |review|
            clean = review.cleanliness
            com = review.communication
            check = review.check_in
            acc = review.accuracy
            loc = review.location
            val = review.value
            total_sum += ((clean+com+check+acc+loc+val)/6.0)
        end

        return (total_sum/self.reviews.length).round(1).to_s
    end
end
