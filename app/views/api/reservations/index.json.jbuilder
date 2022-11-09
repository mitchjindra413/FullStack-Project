@reservations.each do |reservation|
    json.set! reservation.id do
        json.extract! reservation, 
            :id,
            :listing_id,
            :user_id,
            :num_guests,
            :start_date,
            :end_date
        json.listingPropertyType reservation.listing.property_type
        json.listingCity reservation.listing.city
        json.listingCountry reservation.listing.country
        json.listingOwner reservation.listing.owner.first_name
        json.imgUrls reservation.listing.photos.map { |photo| photo.url }
        json.invalidDates (reservation.start_date..reservation.end_date).to_a
        json.listingMaxGuests reservation.listing.max_guests
    end
end