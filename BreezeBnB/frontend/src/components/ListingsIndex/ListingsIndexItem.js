import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { fetchListing } from "../../store/listings"


export const ListingsIndexItem = ({listing}) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(fetchListing(listing.id))
    }

    console.log('listing:', listing)
    return (
        <Link to={`listings/${listing.id}`}>
            <div className="info-container" onClick={handleClick}>
                <div >
                    <img className="index-pics" src={listing.imgUrls[0]}></img>
                </div>
                <div>
                    <div className="index-details-top">
                        <h3 className="index-location">{listing.country === 'United States' ? `${listing.city}, ${listing.state}` : `${listing.city}, ${listing.country}`}</h3>
                        <p className="index-rating">★ Rating</p>
                    </div>
                    <ul>
                        <li className="index-details">{listing.tagLine.length < 35 ? listing.tagLine : `${listing.tagLine.slice(0, 30)}...`}</li>
                        <li className="index-details">{`${listing.numBeds} beds`}</li>
                    </ul>
                    <p className="index-price"><span className="price-span-index">{`$${listing.nightPrice}`}</span> night</p>
                </div>
            </div>
        </Link>
    )
}