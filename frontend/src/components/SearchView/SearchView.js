import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListings } from "../../store/listings"
import ListingMapWrapper from "../ListingMap"

export const SearchView = () => {
    let {lat, lng, place} = useParams()

    const dispatch = useDispatch()
    
    const getListings = (state) => {
        return state.entities.listings ? Object.values(state.entities.listings) : []
    }
    const listings = useSelector(getListings)

    useEffect(() => {
        dispatch(fetchListings())
    }, [])

    return (
        <>
        <p>{place}</p>
            <div className="listing-page-map">
                <ListingMapWrapper listings={listings} mapOptions={{ center: { lat: parseFloat(lat), lng: parseFloat(lng) }, zoom: 12 }}></ListingMapWrapper>
            </div>
        </>
    )
}