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
        <div className="search-page-map" style={{width: '100vw', height:'100vh'}}>
            <SearchViewMapWrapper></SearchViewMapWrapper>
        </div>
        </>
    )
}