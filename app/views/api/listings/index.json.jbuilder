@listings.each do |listing|
    json.set! listing.id do
        json.extract! listing, 
            :id,
            :owner_id,
            :city,
            :state,
            :country,
            :lat,
            :long,
            :tags,
            :property_type,
            :night_price,
            :num_beds,
            :tag_line,
            :max_guests,
            :amenities
        json.imgUrls listing.photos.map { |photo| photo.url }
        json.firstName listing.owner.first_name
        json.ownerPic listing.owner.photo ? listing.owner.photo.url : ''
        json.totalReviews listing.avg_total_review
    end
end

