import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { hideModal } from "../../../store/ui"

export const SuccessfulReservation = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(hideModal())
        history.push('/trips')
    }

    return (
        <div>
            <h2>Congrats!</h2>
            <h3>Your reservation has been completed!</h3>
            <p>Head over to your trips page to manage your reservations</p>
            <button onClick={handleClick}>Take me there</button>
        </div>
    )
}