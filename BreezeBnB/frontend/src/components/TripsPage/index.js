import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUsersReservations } from "../../store/reservations"
import './TripsPage.css'
import { isAfter } from "date-fns"
import { FutureInfo } from "./FutureInfo"

export const TripsPage = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const getReservations = (state) => {
        return state.entities.reservations ? Object.values(state.entities.reservations) : []
    } 
    let reservations = useSelector(getReservations)
    
    useEffect(() => {
        dispatch(fetchUsersReservations(user.id))
    }, [])
    

    const sort = () => {
        const future = []
        const past = []
        reservations.forEach(reservation => {
            let startDateSplit = reservation.startDate.split('-')
            
            if(isAfter(new Date(startDateSplit[0], startDateSplit[1], startDateSplit[2]), new Date())){
                future.push(<FutureInfo key={reservation.id} reservation={reservation}></FutureInfo>)  
            } 
        })

        return (
            <div id="trips-container">
                <div id='future-container'>
                    {future.length === 0 ? blank() : future}
                </div>
            </div>
        )
    }


    const blank = () => {
        return (
            <div className='trip'>
                <div className='trips-left'>
                    <img src="https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/Screenshot+2022-11-04+at+11.57.25+AM.png" alt="icon"></img>
                    <h4>No trips booked...yet!</h4>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <Link to='/'>
                        <button>Start searching</button>
                    </Link>
                </div>
                
                <img className={"trips-right no-show"} src="https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/d727f355-3f10-44b5-9750-d1efca2438fc.webp" alt="family fun"></img>
                
            </div>
        )
    }
    
    return (
        <div id="trips-page">
            <h2>Trips</h2>
            {sort()}
        </div>
    )
}