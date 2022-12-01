import { useDispatch } from "react-redux"
import { fetchListings } from "../../store/listings"
import { fetchListingsType } from "../../store/listings"
import './IndexFilter.css' 

export const IndexFilter = () => {
    const dispatch = useDispatch()

    return (
        <div className="filter-bar">
            <div className="filter-button" onClick={() => dispatch(fetchListings())}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/cabin.jpg'></img>
                <p>New</p>
            </div>
            <div className="filter-button" onClick={() => dispatch(fetchListingsType('OMG'))}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/omg.jpg'></img>
                <p>OMG!</p>
            </div>
            <div className="filter-button" onClick={() => dispatch(fetchListingsType('Luxe'))}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/luxe.jpg'></img>
                <p>Luxe</p>
            </div>
            <div className="filter-button" onClick={() => dispatch(fetchListingsType('Iconic'))}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/city.jpg'></img>
                <p>Iconic cities</p>
            </div>
            <div className="filter-button" onClick={() => dispatch(fetchListingsType('Beach'))}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/beach.jpg'></img>
                <p>Beach</p>
            </div>
        </div>
    )
}