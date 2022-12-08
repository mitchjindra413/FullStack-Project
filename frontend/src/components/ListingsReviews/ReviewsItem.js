import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteReview } from "../../store/reviews"

export const ReviewsItem = ({review}) => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        e.preventDefault()
        setErrors([])

        dispatch(deleteReview(review.id))
    }

    const checkForEdit = () => {
        if(!user) return false
        return user.id === review.userId
    }


    return (
        <div className="ind-review">
            <header className="review-header">
                <img alt="profile" className="profile-pic pic-bigger" src={ review.reviewerPic ? review.reviewerPic : 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3'}></img>
                <div>
                    <h4>{review.reviewerName}</h4>
                    <p>{joinedFormating(review.reviewerJoined)}</p>
                </div>
            </header>
            <p className="review-content">{review.description}</p>
            {checkForEdit() &&(
                <div className="edit-delete">
                    <Link to={`/listings/${review.listingId}/reviews/${review.id}/edit`}><button >Edit</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export const joinedFormating = (stringTime) => {
    let splited = stringTime.split('-')
    const month = ["January", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return month[parseInt(splited[1]) - 1] + ' ' + splited[0]
}