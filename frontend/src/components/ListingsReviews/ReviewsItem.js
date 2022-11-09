import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const ReviewsItem = ({review}) => {
    const user = useSelector(state => state.session.user)

    return (
        <div className="ind-review">
            <header className="review-header">
                <img className="profile-pic pic-bigger" src={review.reviewerPic}></img>
                <div>
                    <h4>{review.reviewerName}</h4>
                    <p>{joinedFormating(review.reviewerJoined)}</p>
                </div>
            </header>
            <p className="review-content">{review.description}</p>
            {user.id === review.userId &&(
                <Link to='/edit'>Edit</Link>
            )}
        </div>
    )
}

export const joinedFormating = (stringTime) => {
    let splited = stringTime.split('-')
    const month = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return month[parseInt(splited[1]) - 1] + ' ' + splited[0]
}