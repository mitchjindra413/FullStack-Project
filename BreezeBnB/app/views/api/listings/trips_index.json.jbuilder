@listings.each do |listing|
    json.set! listing.id do
        json.extract! listing,
            :id,
            :owner_id,
            :city,
            :state,
            :country,
            :property_type,
            :street_address,
            :lat,
            :long,
            :tags,
            :night_price,
            :num_beds,
            :tag_line,
            :max_guests,
            :amenities
        json.imgUrls listing.photos.map { |photo| photo.url }
        json.extract! @owners[listing.owner_id],
            :first_name
    end
end
