import { useDispatch, useSelector } from "react-redux"
import { fetchListings } from "../../store/listings"
import { ListingsIndexItem } from "./ListingsIndexItem"
import { useEffect } from "react"
import './ListingsIndex.css'

export const ListingsIndex = () => {
    const dispatch = useDispatch()

    const getListings = (state) => {
        return state.entities.listings ? Object.values(state.entities.listings) : []
    } 
    const listings = useSelector(getListings)

    useEffect(() => {
        dispatch(fetchListings(listings))
    }, [])

    if(!listings) return null

    return (
        <div >
            <div>
                Filter div
            </div>
            <div id='index-page'>
                {listings.map(listing => <ListingsIndexItem key={listing.id} listing={listing} ></ListingsIndexItem>)}
            </div>
        </div>
    )
}