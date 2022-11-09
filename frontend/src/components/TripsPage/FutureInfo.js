import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteReservation, updateReservation } from "../../store/reservations"
import { useEffect, useState } from "react"


export const FutureInfo = ({reservation}) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const numGuests = reservation.numGuests

    const [showMenu, setShowMenu] = useState(false)
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [totalGuests, setTotalGuests] = useState()

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

    useEffect(() => {
        setTotalGuests(adults + children)
    }, [adults, children])

    const openMenu = () => {
        if (showMenu) {
            return setShowMenu(false)
        } else {
            return setShowMenu(true)
        }
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        const newReservation = {listing_id: reservation.listingId, id: reservation.id, user_id: reservation.userId, start_date: reservation.startDate, end_date: reservation.endDate, num_guests: totalGuests}
        dispatch(updateReservation(newReservation))
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
            .then(openMenu())
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
                            <button onClick={() => openMenu()}>Edit reservation</button>
                            <button onClick={handleClick}>Cancel reservation</button>
                        </div>
                    </div>
                    {showMenu && (
                        <form onSubmit={handleSubmit} className="dropdown-reservation dropdown-edit" style={{ zIndex: 1 }}>
                            <div className="dropdown-title">
                                <button type="button" className="close-edit " onClick={() => setShowMenu(false)}>X</button>
                                <h3 >Old number of guests: {numGuests}</h3>
                                <h3 >New number of guests: {totalGuests}</h3>
                            </div>
                            <div className="age">
                                <div >
                                    <h3>Adults</h3>
                                    <p>Age 13+</p>
                                </div>
                                <div className="age-button">
                                    <button type="button" disabled={adults === 1} onClick={() => setAdults(adults - 1)}>-</button>
                                    <h4>{adults}</h4>
                                    <button type="button" disabled={totalGuests === reservation.listingMaxGuests} onClick={() => setAdults(adults + 1)}>+</button>
                                </div>
                            </div>
                            <div className="age">
                                <div>
                                    <h3>Children</h3>
                                    <p>Ages 2-12</p>
                                </div>
                                <div className="age-button">
                                    <button type="button" disabled={children === 0} onClick={() => setChildren(children - 1)}>-</button>
                                    <h4>{children}</h4>
                                    <button type="button" disabled={totalGuests === reservation.listingMaxGuests} onClick={() => setChildren(children + 1)}>+</button>
                                </div>
                            </div>
                            <button className="update-submit">Update reservation</button>
                        </form>
                    )}
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