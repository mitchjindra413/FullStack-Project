json.listing do 
    json.extract! @listing,
        :id,
        :owner_id,
        :city,
        :zip_code,
        :state,
        :country,
        :lat,
        :long,
        :tags,
        :property_type,
        :max_guests,
        :night_price,
        :cleaning_fee,
        :description,
        :num_bedrooms,
        :num_beds,
        :num_baths,
        :amenities,
        :tag_line,
        :max_guests
    json.imgUrls @listing.photos.map { |photo| photo.url }
    json.extract! @owner,
        :first_name,
        :bio,
        :created_at
    json.ownerPic @owner.photo.url
    json.totalReviews @listing.avg_total_review
end

listing_reservations = @listing.reservations
json.reservations do
    listing_reservations.each do |reservation|
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
end

listing_reviews = @listing.reviews
json.reviews do 
    listing_reviews.each do |review|
        json.set! review.id do 
            json.extract! review,
                :id,
                :listing_id, 
                :description,
                :cleanliness, 
                :accuracy, 
                :location, 
                :value, 
                :communication, 
                :check_in
            json.reviewerPic review.user.photo.url
            json.reviewerName review.user.first_name
            json.reviewerJoined review.user.created_at
        end
    end
end