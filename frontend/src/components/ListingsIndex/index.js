import { useDispatch, useSelector } from "react-redux"
import { fetchListings } from "../../store/listings"
import { ListingsIndexItem } from "./ListingsIndexItem"
import { useEffect, useState } from "react"
import './ListingsIndex.css'
import ListingMapWrapper from "../ListingMap"
import { useHistory } from "react-router-dom"
import { IndexFilter } from "../IndexFilter/IndexFilter"

export const ListingsIndex = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showMap, setShowMap] = useState(false)

    const getListings = (state) => {
        return state.entities.listings ? Object.values(state.entities.listings) : []
    } 
    const listings = useSelector(getListings)

    useEffect(() => {
        dispatch(fetchListings())
    }, [dispatch])
    
    const switchView = () => {
        if(showMap === true) {
            setShowMap(false)
        } else {
            setShowMap(true)
        }
    }

    if(!listings) return null

    return (
        <div >
            <IndexFilter></IndexFilter>
            <div className="index-map-container">
                <div className="switch-button-wrapper">
                    <div className="switch-button-container">
                        <button onClick={switchView}>{showMap ? <p>Show menu<i className="fa-solid fa-list-ul fa-show"></i></p> : <p>Show map<i className="fa-solid fa-map fa-show"></i></p>}</button>
                    </div>
                </div>
                <div id='index-page' style={!showMap ? { display: 'grid' } : { display: 'none' }}>
                    {listings.map(listing => <ListingsIndexItem key={listing.id} listing={listing} ></ListingsIndexItem>)}
                </div>
                <div className="map-container" style={showMap ? { display: 'block' } : {display: 'none'}}>
                    <ListingMapWrapper
                        listings = {listings}
                        markerEventHandlers={{
                            click: (listing) => history.push(`/listings/${listing.id}`)
                            
                        }}
                    >
                    </ListingMapWrapper>
                </div>
            </div>
        </div>
    )
}