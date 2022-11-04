import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchUsersReservations } from "../../store/reservations"
import { fetchTripsListings } from "../../store/listings"

export const TripsPage = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const reservations = (state => state.entities.reservations)
    const listings = (state => state.entities.listings)
    const past = []
    const future = []

    const sort = () => {
        reservations.array.forEach(reservation => {
            reservation.start_date > new Date() ? future.push(reservation) : past.push(reservation)
        });
    }

    useEffect(() => {
        dispatch(fetchUsersReservations(user.id))
        dispatch(fetchTripsListings(user.id))
        sort()
    }, [reservations])

    const blank = () => {
        return (
            <div id='no-trips'>
                <div id='no-trips-left'>
                    <img src="https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/Screenshot+2022-11-04+at+11.57.25+AM.png" alt="icon"></img>
                    <h4>No trips booked...yet!</h4>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <Link to='/'>
                        <button>Start searching</button>
                    </Link>
                </div>
                <img src="https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/d727f355-3f10-44b5-9750-d1efca2438fc.webp" alt="family fun"></img>
            </div>
        )
    }

    

    const anyPast = () => {

    }

    return (
        <div id="trips-page">
            <h2>Trips</h2>
            
        </div>
    )
}