json.extract! @reservation,
    :id,
    :listing_id,
    :user_id,
    :start_date,
    :end_date,
    :num_guests
json.listingPropertyType @reservation.listing.property_type
json.listingCity @reservation.listing.city
json.listingCountry @reservation.listing.country
json.listingOwner @reservation.listing.owner.first_name
json.imgUrls @reservation.listing.photos.map { |photo| photo.url }
json.invalidDates (@reservation.start_date..@reservation.end_date).to_a