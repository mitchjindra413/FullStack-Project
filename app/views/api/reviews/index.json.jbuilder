@reviews.each do |review|
    json.set! review.id do
        json.extract! review, 
            :id,
            :user_id, 
            :listing_id,
            :description, 
            :cleanliness, 
            :accuracy, 
            :location, 
            :value, 
            :communication, 
            :check_in
        json.reviewerPic review.user.photo.url
    end
end