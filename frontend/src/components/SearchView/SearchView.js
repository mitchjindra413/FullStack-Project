import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListings } from "../../store/listings"
import ListingMapWrapper from "../ListingMap"
import { SearchViewMapWrapper } from "./SearchViewMap"

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
                <SearchViewMapWrapper></SearchViewMapWrapper>
            </div>
        </>
    )
}