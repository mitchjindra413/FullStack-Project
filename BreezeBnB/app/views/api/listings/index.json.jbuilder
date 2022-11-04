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
            :max_guests
        json.imgUrls listing.photos.map { |photo| photo.url }
    end
end
