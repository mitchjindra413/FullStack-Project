import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing } from "../../../store/listings"
import './ListingPage.css'

export const ListingPage = () => {
    const { listingId } = useParams()
    const dispatch = useDispatch()
    const listing = useSelector(state => state.entities.listings[listingId])


    useEffect(() => {
        dispatch(fetchListing(listingId))
    }, [listingId])

    function detailsFormating() {
        let string = ''
        listing.maxGuests !== 1 ? string += listing.maxGuests + ' guests • ' : string += listing.maxGuests + ' guest • '
        listing.numBedrooms !== 1 ? string += listing.numBedrooms + ' bedrooms • ' : string += listing.numBedrooms + ' bedroom • '
        listing.numBeds !== 1 ? string += listing.numBeds + ' beds • ' : string += listing.numBeds + ' bed • '
        listing.numBaths !== 1 ? string += listing.numBaths + ' baths' : string += listing.numBaths + ' bath'
        return string
    }

    if(!listing) return null

    return (
        <div>
            <header>
                <h2 className="listing-page-tag-line">{listing.tagLine}</h2>
                <ul>
                    <li>{listing.city},</li>
                    <li>{listing.state},</li>
                    <li>{listing.country}</li>
                </ul>
            </header>
            <figure>
                {listing.imgUrls.map(url => <img src={url}></img>)}
            </figure>
            <div className="info-reservation">
                <div>
                    <div className="listing-general-info">
                        <h3>{`${listing.propertyType} hosted by ${listing.firstName}`}</h3>
                        <p>{detailsFormating()} </p>
                    </div>
                    <div>
                        <p>{listing.description}</p>
                    </div>
                </div>
                <div className="reservation-container">
                    <div className="reservation-container-info">
                        <p><span>{listing.nightPrice}</span> night</p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    review grahics
                </div>
                <div>
                    reviews
                </div>
            </div>
            <div>
                <h3>Where you'll be</h3>
                <p>{listing.city}, {listing.state}, {listing.country}</p>
            </div>
            <div>
                <h4>Hosted by {listing.firstName}</h4>
                <p>{listing.bio ? listing.bio : ''}</p>
            </div>
        </div>
    )
}