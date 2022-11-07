@reservations.each do |reservation|
    json.set! reservation.id do
        json.extract! reservation, 
            :id,
            :user_id,
            :listing_id,
            :num_guests,
            :start_date,
            :end_date
        json.listingPropertyType reservation.listing.property_type
        json.listingCity reservation.listing.city
        json.listingCountry reservation.listing.country
        json.listingOwner reservation.listing.owner.first_name
    end
end