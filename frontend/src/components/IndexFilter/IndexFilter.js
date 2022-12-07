import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchListings } from "../../store/listings"
import { fetchListingsType } from "../../store/listings"
import './IndexFilter.css' 

export const IndexFilter = () => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState('all')

    return (
        <div className="filter-bar">
            <div className="filter-button" onClick={() => {dispatch(fetchListings()); setSelected('all')}} style={selected === 'all' ? { borderBottom: '2px solid #222222'} : {}}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/cabin.jpg'></img>
                <p>All</p>
            </div>
            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('OMG')); setSelected('OMG')}} style={selected === 'OMG' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/omg.jpg'></img>
                <p>OMG!</p>
            </div>
            <div className="filter-button" onClick={() => { dispatch(fetchListingsType('Luxe')); setSelected('Luxe')}} style={selected === 'Luxe' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/luxe.jpg'></img>
                <p>Luxe</p>
            </div>
            <div className="filter-button" onClick={() => { dispatch(fetchListingsType('Iconic')); setSelected('Iconic') }} style={selected === 'Iconic' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/city.jpg'></img>
                <p>Iconic cities</p>
            </div>
            <div className="filter-button" onClick={() => { dispatch(fetchListingsType('Beach')); setSelected('Beach') }} style={selected === 'Beach' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/beach.jpg'></img>
                <p>Beachfront</p>
            </div>
            <div className="filter-button" onClick={() => { dispatch(fetchListingsType('Beach')); setSelected('Tropical') }} style={selected === 'Tropical' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/tropical.jpg'></img>
                <p>Tropical</p>
            </div>
        </div>
    )
}