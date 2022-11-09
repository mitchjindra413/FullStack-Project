class Review < ApplicationRecord
    validates :user_id, :listing_id, :description, presence: true
    validates :cleanliness, :accuracy, :location, :value, :communication, :check_in, presence: true, numericality: {in: 0..5}
    validates :user_id, uniqueness: {scope: :listing_id}

    belongs_to :user
    belongs_to :listing
end
