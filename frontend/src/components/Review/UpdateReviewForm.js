import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { updateReview } from "../../store/reviews"
import './ReviewForm.css'


export const UpdateReviewForm = () => {
    const dispatch = useDispatch()
    const {reviewId} = useParams()
    const review = useSelector(state => state.entities.reviews[reviewId])
    
    const [description, setDescription] = useState(review.description)
    const [cleanliness, setCleanliness] = useState(review.cleanliness)
    const [accuracy, setAccuracy] = useState(review.accuracy)
    const [location, setLocation] = useState(review.location)
    const [value, setValue] = useState(review.value)
    const [communication, setCommunication] = useState(review.communication)
    const [checkIn, setCheckIn] = useState(review.checkIn)
    const [errors, setErrors] = useState([])
    const history = useHistory()
    

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        const newReview = {
            id: review.id,
            listing_id: review.listingId, 
            user_id: review.userId, 
            description, 
            cleanliness, 
            accuracy, 
            location, 
            value, 
            communication, 
            check_in: checkIn }

        return dispatch(updateReview(newReview))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json()
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                else setErrors([res.statusText])
            })
            .then(
                history.push(`/listings/${review.listingId}`)
            )
    }

    const makeRadioButtons = (string, variable, action) => {
        return(
            <div>
                <h3>{string}: {variable}</h3>
                <input
                    type='range'
                    max='5'
                    min='0'
                    step='1'
                    value={variable}
                    onChange={(e) => action(e.target.value)}
                >
                </input>
            </div>
        )
    }

    return (
        <div className="review-form-wrapper">
            <div id='review-form-container'>
                <form id='review-form' onSubmit={handleSubmit}>
                    <h2>Let your host and others know how they did:</h2>
                    {makeRadioButtons('Accuracy', accuracy, setAccuracy)}
                    {makeRadioButtons('Check-in', checkIn, setCheckIn)}
                    {makeRadioButtons('Cleanliness', cleanliness, setCleanliness)}
                    {makeRadioButtons('Communication', communication, setCommunication)}
                    {makeRadioButtons('Location', location, setLocation)}
                    {makeRadioButtons('Value', value, setValue)}
                    <h3>Next, let others know about your experience:</h3>
                    <textarea
                        type='textarea'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Required: Write a review"
                        rows="5" cols="30"
                        required>
                    </textarea>
                    <ul className="error-list">
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}