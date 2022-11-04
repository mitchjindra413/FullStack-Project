import { createReservation } from "../../store/reservations"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom"

export const ReservationForm = () => {
    const dispatch = useDispatch()
    const {listingId} = useParams()
    const listing = useSelector(state => state.entities.listings[listingId])
    const user = useSelector(state => state.session.user)

    let userId
    if(user){
        userId = user.id
    } else {
        userId = null
    }

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [numGuests, setNumGuests] = useState()
    const [showMenu, setShowMenu] = useState(false)
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [errors, setErrors] = useState([])

    // useEffect(() => {
    //     if (!showMenu) return

    //     const closeMenu = () => {
    //         setShowMenu(false)
    //     }

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener('click', closeMenu)
    // }, [showMenu])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        setNumGuests(adults + children)
    }, [adults, children])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        return dispatch(createReservation({ listingId, userId, numGuests, startDate, endDate }))
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
        <form className="reservation-form" onSubmit={handleSubmit}>
            <div>
                <div>
                    CHECK-IN
                    <input 
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required 
                    ></input>
                </div>
                <div>
                    CHECKOUT
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    ></input>
                </div>
                <div onClick={openMenu}>
                    <p>Guests</p>
                    <p>{numGuests === 1 ? '1 guest' : `${numGuests} guests`}</p>
                    
                </div>
                
            </div>
            <button disabled={userId === null}>Reserve</button>
            {showMenu && (
                <div className="dropdown-reservation" style={{ zIndex: 1 }}>
                    <div className="age">
                        <div>
                            <h3>Adults</h3>
                            <p>Age 13+</p>
                        </div>
                        <div>
                            <button type="button" disabled={adults === 1} onClick={() => setAdults(adults - 1)}>-</button>
                            <h4>{adults}</h4>
                            <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setAdults(adults + 1)}>+</button>
                        </div>
                        <div>
                            <h3>Children</h3>
                            <p>Ages 2-12</p>
                        </div>
                        <div>
                            <button type="button" disabled={children === 0} onClick={() => setChildren(children - 1)}>-</button>
                            <h4>{children}</h4>
                            <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setChildren(children + 1)}>+</button>
                        </div>
                    </div>
                    <button type="button" onClick={() => setShowMenu(false)}>X</button>
                </div>
            )}
        </form>
    )
}
