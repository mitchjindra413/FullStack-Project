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
        json.img_urls listing.photos.map { |photo| url_for(photo) }
    end
end