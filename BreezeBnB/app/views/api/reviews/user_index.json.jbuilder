json.set! @review.id do
    json.extract! @review, 
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
    json.profilePics @user[@review.id].photo.map { |photo| photo.url }
end