import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing } from "../../../store/listings"

export const ListingPage = () => {
    const { listingId } = useParams()
    const dispatch = useDispatch()
    const listing = useSelector(state => state.entities.listings[listingId])

    useEffect(() => {
        dispatch(fetchListing(listingId))
    }, [listingId])

    return (
        <div>
            <div>
                <h2 className="listing-page-tag-line">Hi</h2>
            </div>
            <figure>
                pictures
            </figure>
            <div>
                <div className="listing-general-info">
                    <h2>{`${listing.propertyType} hosted by `}</h2>
                </div>
            </div>
        </div>
    )
}