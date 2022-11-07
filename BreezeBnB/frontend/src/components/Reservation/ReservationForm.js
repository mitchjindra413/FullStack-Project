import { createReservation } from "../../store/reservations"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { addDays, differenceInCalendarDays, parseISO } from 'date-fns'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

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
    const [focusedInput, setFocusedInput] = useState()

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

        const reservation = { listingId, userId, numGuests, startDate, endDate }

        return dispatch(createReservation(reservation))
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
                <p><span id='price'>${listing.nightPrice}</span> night</p>
            </div>
            <div>
                <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="start-date" // PropTypes.string.isRequired,
                    startDatePlaceholderText="CHECK-IN"
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="end-date" // PropTypes.string.isRequired,
                    endDatePlaceholderText='CHECKOUT'
                    onDatesChange={({startDate, endDate}) => {
                        setStartDate(startDate); 
                        setEndDate(endDate)}} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={(focusedInput) =>  setFocusedInput(focusedInput) } // PropTypes.func.isRequired,
                />
                <div onClick={openMenu}>
                    <p>Guests</p>
                    <p>{numGuests === 1 ? '1 guest' : `${numGuests} guests`}</p>
                    
                </div>
                
            </div>
            <button type="submit" disabled={userId === null}>Reserve</button>
            <p>You wont be charged yet</p>
            <div>
                <p>${listing.nightPrice} x {differenceInCalendarDays(endDate, startDate)}</p>
                <p>{listing.nightPrice * differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) }</p>
            </div>
            <div>
                <p>Cleaning Fee</p>
                <p>{listing.cleaningFee}</p>
            </div>
            <div>
                <p>Total before taxes</p>
                <p></p>
            </div>
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
