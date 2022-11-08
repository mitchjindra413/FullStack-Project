import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteReservation } from "../../store/reservations"
import { useState } from "react"

export const FutureInfo = ({reservation}) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    const dateFormat = (start, end) => {
        const startSplit = start.split('-')
        const endSplit = end.split("-")
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

        return (
            <div className='future-date'>
                <p>{parseInt(startSplit[2])} - {parseInt(endSplit[2])}</p>
                {startSplit[1] === endSplit[1] ? <p>{month[parseInt(startSplit[1]) - 1]}</p> : <p>{month[parseInt(startSplit[1]) - 1]} - {month[parseInt(endSplit[1]) - 1]}</p>}
                {startSplit[0] === endSplit[0] ? <p>{startSplit[0]}</p> : <p>{startSplit[0]} - {endSplit[0]}</p>}
            </div>
        )
    }

    const handleClick = (e) => {
        e.preventDefault()
        setErrors([])

        dispatch(deleteReservation(reservation.id))
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
    }

    return (
        <div >
            <div className="future-trip">
                <div className="future-trips-left">
                    <Link to={`/listings/${reservation.listingId}`}>
                        <div className="future-top">
                            <h4>{reservation.listingCity}</h4>
                            <p>{reservation.listingPropertyType} hosted by {reservation.listingOwner}</p>
                        </div>
                    </Link>
                    <div className="future-bottom">
                        <Link to={`/listings/${reservation.listingId}`}>
                            {dateFormat(reservation.startDate, reservation.endDate)}
                        </Link>
                        <div className="reservation-buttons">
                            <Link to='/users/:reservation_id/edit'><button>Edit reservation</button></Link>
                            <button onClick={handleClick}>Cancel reservation</button>
                        </div>
                    </div>
                </div>
                <Link to={`/listings/${reservation.listingId}`}>
                    <div>
                        <img className={"future-trips-right no-show"} src={reservation.imgUrls[0]}></img>
                    </div>
                </Link>
            </div>
        </div>
    )


}