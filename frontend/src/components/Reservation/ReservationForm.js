import { createReservation } from "../../store/reservations"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom"
import 'react-dates/initialize'
import { DateRangePicker} from 'react-dates'
import { SuccessfulReservationModal } from "./ReservationModal"
import moment from 'moment'
import 'react-dates/lib/css/_datepicker.css'
import './ReservationForm.css'
import { showModal } from "../../store/ui"

export const ReservationForm = () => {
    const dispatch = useDispatch()
    const {listingId} = useParams()
    const listing = useSelector(state => state.entities.listings[listingId])
    const user = useSelector(state => state.session.user)
    
    const getReservations = (state) => {
        return state.entities.reservations ? Object.values(state.entities.reservations) : []
    }
    let reservations = useSelector(getReservations)

    let userId
    if(user){
        userId = user.id
    } else {
        userId = null
    }

    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(moment().add(1, 'day'))
    const [numGuests, setNumGuests] = useState()
    const [showMenu, setShowMenu] = useState(false)
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [errors, setErrors] = useState([])
    const [focusedInput, setFocusedInput] = useState()
    const modal = useSelector(state => state.ui.modal)

    const openMenu = () => {
        if (showMenu) {
            return setShowMenu(false)
        } else {
            return setShowMenu(true)
        }
    }

    useEffect(() => {
        setNumGuests(adults + children)
    }, [adults, children])

    const isBlocked = (day) => {
        let mock = moment().add(6, 'days').startOf('day')
        if (day.isSame(mock)) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
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
            {modal === 'successfulReservation' &&(<SuccessfulReservationModal ></SuccessfulReservationModal>)}
            
            <div className="top-info">
                <p><span id='price'>${listing.nightPrice}</span> night</p>
            </div>
            <div>
                <div className="date-container" style={errors.includes('Start date timeframe already taken') ? { border: '2px solid red' } : {}}>
                    <div className="date-picker-title">
                        <h3>CHECK-IN</h3>
                        <h3 className="checkout">CHECKOUT</h3>
                    </div>
                    <div className="picker">

                    <DateRangePicker
                        // isBlockedDay={(day) => isBlocked(day)}
                        startDate={startDate} 
                        startDateId="start-date" 
                        startDatePlaceholderText="CHECK-IN"
                        endDate={endDate} 
                        endDateId="end-date" 
                        endDatePlaceholderText='CHECKOUT'
                        onDatesChange={({startDate, endDate}) => {
                            setStartDate(startDate); 
                            setEndDate(endDate)}} 
                        focusedInput={focusedInput} 
                        onFocusChange={(focusedInput) =>  setFocusedInput(focusedInput) }
                        small={true}
                        noBorder={true}
                        hideKeyboardShortcutsPanel
                    />
                    </div>
                </div>
                <div className="guests-container" onClick={openMenu}>
                    <div>
                        <p>Guests</p>
                        <p>{numGuests === 1 ? '1 guest' : `${numGuests} guests`}</p>
                    </div>
                    {!showMenu ? <i className="fa-sharp fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                </div>
                
            </div>
            <ul className="error-list">
                {errors.map(error => <li key={error} style={{color: 'red'}}>{error}</li>)}
            </ul>
            {userId === null ? <button onClick={() => dispatch(showModal())} className='reserve disabled' type="button">Reserve</button> : <button  className='reserve' type="submit">Reserve</button>}
            <p className="no-charge">You wont be charged yet</p>
            <div className="general-info">
                <p className="underline">${listing.nightPrice} x {startDate & endDate ? endDate.diff(startDate, 'days'): '1'} nights</p>
                {startDate & endDate ? <p>${listing.nightPrice * endDate.diff(startDate, 'days')}</p> : <p>${listing.nightPrice}</p>}
    
            </div>
            <div className="general-info">
                <p className="underline">Cleaning Fee</p>
                <p>${listing.cleaningFee}</p>
            </div>
            <div className="general-info">
                <p className="underline">Service Fee</p>
                <p>${Math.floor((listing.cleaningFee + (startDate & endDate ? listing.nightPrice * endDate.diff(startDate, 'days') : listing.nightPrice)) * 0.14)}</p>
            </div>
            <div className={"general-info before-taxes"} >
                <h4>Total before taxes</h4>
                <h4>${Math.floor((listing.cleaningFee + (startDate & endDate ? listing.nightPrice * endDate.diff(startDate, 'days') : listing.nightPrice)) * 0.14) + (listing.cleaningFee + (startDate & endDate ? listing.nightPrice * endDate.diff(startDate, 'days') : listing.nightPrice))}</h4>
            </div>
            {showMenu && (
                <div className="dropdown-reservation" style={{ zIndex: 1 }}>
                    <div className="age">
                        <div >
                            <h3>Adults</h3>
                            <p>Age 13+</p>
                        </div>
                        <div className="age-button">
                            <button type="button" disabled={adults === 1} onClick={() => setAdults(adults - 1)}>-</button>
                            <h4>{adults}</h4>
                            <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setAdults(adults + 1)}>+</button>
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
                            <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setChildren(children + 1)}>+</button>
                        </div>
                    </div>
                    <button className="age close-button" type="button" onClick={() => setShowMenu(false)}>Close</button>
                </div>
            )}
        </form>
    )
}
