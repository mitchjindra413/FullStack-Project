class Reservation < ApplicationRecord
    require 'date'

    validates :user_id, :listing_id, :num_guests, presence: true
    validates :start_date, :end_date, presence: true
    validate :valid_date
    validate :no_overlap

    def valid_date
        if start_date > end_date
            errors.add(:start_date, 'Start date must be before end date')
        end

        if (start_date < Date.today) || (end_date < Date.today)
            errors.add(:start_date, 'Reservations must be made in the future')
        end
    end

    def no_overlap
        reservations = Reservation.where(listing_id: listing_id)
            .where('start_date <= ?', end_date)
            .where('end_date >= ?', start_date)
            .where('id != ?', id)
        
        if reservations.length != 0
            return errors.add(:start_date, message: 'timeframe already taken')
        end
    end

    belongs_to :user
    belongs_to :listing
end
