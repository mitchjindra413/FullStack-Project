json.extract! @reservation,
    :id,
    :user_id,
    :listing_id,
    :start_date,
    :end_date,
    :num_guests
json.listingPropertyType reservation.listing.property_type
json.listingCity reservation.listing.city
json.listingCountry reservation.listing.country
json.listingOwner reservation.listing.owner.first_name
json.imgUrls reservation.listing.photos.map { |photo| photo.url }