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
json.reviewerPic @review.user.photo.url
json.reviewerName @review.user.first_name
json.reviewerJoined @review.user.created_at