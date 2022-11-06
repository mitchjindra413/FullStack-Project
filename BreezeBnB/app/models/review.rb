class Review < ApplicationRecord
    validates :user_id, :listing_id, presence: true
    validates :description, :cleanliness, :accuracy, :location, :value, :communication, :check_in, presence: true, numericality: {in: 0..5}

    belongs_to :user
    belongs_to :listing
end