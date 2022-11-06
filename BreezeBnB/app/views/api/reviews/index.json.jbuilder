@reviews.each do |review|
    json.set! review.id do
        json.extract! review, 
            :id,
            :user_id, 
            :listing_id,
            :review, 
            :cleanliness, 
            :accuracy, 
            :location, 
            :value, 
            :communication, 
            :check_in
        json.profilePics @users[review.id].photo.map { |photo| photo.url }
    end
end