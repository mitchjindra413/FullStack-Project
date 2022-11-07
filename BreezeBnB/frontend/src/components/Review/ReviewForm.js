import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createReview } from "../../store/reviews"
import './ReviewForm.css'


export const ReviewForm = () => {
    const dispatch = useDispatch()
    const {listingId} = useParams()
    const userId = useSelector(state => state.session.user.id)
    const [description, setDescription] = useState('')
    const [cleanliness, setCleanliness] = useState(1)
    const [accuracy, setAccuracy] = useState(1)
    const [location, setLocation] = useState(1)
    const [value, setValue] = useState(1)
    const [communication, setCommunication] = useState(1)
    const [checkIn, setCheckIn] = useState(1)
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        const intListingId = parseInt(listingId)

        const totalReview = { listing_id: intListingId, user_id: userId, description, cleanliness, accuracy, location, value, communication, check_in: checkIn }
        return dispatch(createReview(totalReview))
            .catch(async (res) => {
                debugger
                if(res.ok){
                    history.push(`/listings/${listingId}`)
                }
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
            <img src="https://a0.muscache.com/im/pictures/93ef1829-62d1-4349-8b4a-b02ebc650a25.jpg?im_w=2560&im_q=highq"></img>
        </div>
    )
}