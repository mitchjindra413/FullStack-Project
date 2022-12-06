import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchListings } from "../../store/listings"
import { ListingsIndexItem } from "../ListingsIndex/ListingsIndexItem"
import { SearchViewMapWrapper } from "./SearchViewMap"
import './SearchView.css'

export const SearchView = () => {
    const dispatch = useDispatch()
    const {about} = useParams()
    const parsed = JSON.parse(about)
    console.log('about', parsed[0].geometry.bounds.south)
    const [highlightedListing, setHighlightedListing] = useState(null)
    const [bounds, setBounds] = useState(`${parsed[0].geometry.bounds.south}, ${parsed[0].geometry.bounds.west}, ${parsed[0].geometry.bounds.north}, ${parsed[0].geometry.bounds.east}`)
    const history = useHistory()
    
    
    const getListings = (state) => {
        return state.entities.listings ?  Object.values(state.entities.listings) : []
    }
    const listings = useSelector(getListings)

    useEffect(() => {
        console.log(bounds)
        dispatch(fetchListings({bounds}))
    }, [bounds])

    const mapEventHandlers = useMemo(() => ({
        idle: map => setBounds(map.getBounds().toUrlValue())
    }), [history])

    return (
        <div className="search-page-container page-height">
            <div className="search-page-map" >
                <SearchViewMapWrapper
                    listings = {listings}
                    markerEventHandlers= {{
                        click: (listing) => history.push(`/`),
                        mouseover: (listing) => setHighlightedListing(listing.id),
                        mouseout: () => setHighlightedListing(null)
                    }}
                    mapEventHandlers = {mapEventHandlers}
                ></SearchViewMapWrapper>
            </div>
            <div className="search-page-listings">
                {listings.map(listing => <ListingsIndexItem key={listing.id} listing={listing} ></ListingsIndexItem>)}
            </div>
        </div>
    )
}