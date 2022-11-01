@listings.each do |listing|
    json.set! listing.id do
        json.extract! listing, 
            :id,
            :city,
            :state,
            :country,
            :lat,
            :long,
            :tags,
            :property_type,
            :night_price,
            :num_beds,
            :tag_line
    end
end