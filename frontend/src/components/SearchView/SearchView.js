import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchListings } from "../../store/listings"
import { SearchViewMapWrapper } from "./SearchViewMap"

export const SearchView = () => {
    const dispatch = useDispatch()
    const [highlightedListing, setHighlightedListing] = useState(null)
    const [bounds, setBounds] = useState(null)
    const history = useHistory()
    
    const getListings = (state) => {
        let x 
        state.entities.listings ? x = Object.values(state.entities.listings) : x = []
        return x
    }
    const listings = useSelector(getListings)

    useEffect(() => {
        dispatch(fetchListings())
    }, [bounds])

    const mapEventHandlers = useMemo(() => ({
        idle: map => setBounds(map.getBounds().toUrlValue())
    }), [history])

    return (
        <div className="search-page-container">
            <div className="search-page-map" style={{width: '100vw', height:'90vh'}}>
                <SearchViewMapWrapper
                    listings = {listings}
                    markerEventHandlers= {{
                        click: (listing) => history.pushState(`/listings/${listing.id}`),
                        mouseover: (listing) => setHighlightedListing(listing.id),
                        mouseout: () => setHighlightedListing(null)
                    }}
                    mapEventHandlers = {mapEventHandlers}
                ></SearchViewMapWrapper>
            </div>
            <div className="search-page-listings">
                
            </div>
        </div>
    )
}