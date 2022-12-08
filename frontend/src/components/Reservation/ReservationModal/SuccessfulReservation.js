import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { hideModal } from "../../../store/ui"
import './SuccessfulReservation.css'

export const SuccessfulReservation = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {listingId} = useParams()
    const listing = useSelector(state => state.entities.listings[listingId])

    const handleClick = () => {
        dispatch(hideModal())
        history.push('/trips')
    }


    return (
        <div className="successful-reservation">
            <button onClick={() => dispatch(hideModal())}>X</button>
            <div className="success-title">
                <h2>Congrats - </h2>
                <h2>You're headed to {listing.city}!</h2>
            </div>
            <h3>Your reservation has been completed!</h3>
            <p>Head over to your trips page to manage your reservations</p>
            <button className='to-trips' onClick={handleClick}>Take me there</button>
        </div>
    )
}