import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing } from "../../store/listings"
import { ReservationForm } from "../Reservation/ReservationForm"
import './ListingPage.css'
import { ListingsReviews } from "../ListingsReviews"
import ListingMapWrapper from "../ListingMap"

export const ListingPage = () => {
    const { listingId } = useParams()
    const dispatch = useDispatch()
    const listing = useSelector(state => state.entities.listings[listingId])
    

    useEffect(() => {
        dispatch(fetchListing(listingId))
    }, [listingId, dispatch])

    function detailsFormating() {
        let string = ''
        listing.maxGuests !== 1 ? string += listing.maxGuests + ' guests • ' : string += listing.maxGuests + ' guest • '
        listing.numBedrooms !== 1 ? string += listing.numBedrooms + ' bedrooms • ' : string += listing.numBedrooms + ' bedroom • '
        listing.numBeds !== 1 ? string += listing.numBeds + ' beds • ' : string += listing.numBeds + ' bed • '
        listing.numBaths !== 1 ? string += listing.numBaths + ' baths' : string += listing.numBaths + ' bath'
        return string
    }

    if(!listing) return null
    const listingAmens = listing.amenities.split(' ')

    return (
        <div className="listing-page">
            <header>
                <h2 className="listing-page-tag-line">{listing.tagLine}</h2>
                <ul>
                    <li>{listing.city},</li>
                    <li>{listing.state},</li>
                    <li>{listing.country}</li>
                </ul>
                
            </header>
            <div id="figure-container">
                <figure>
                    <div className="image-grid-col-2 image-grid-row-2" id="photo-1" >
                        <img alt="1" src={listing.imgUrls[0]} />
                    </div>
                    <div>
                        <img alt="2" id="photo-2" src={listing.imgUrls[1]} />
                    </div>
                    <div>
                        <img alt="3" id="photo-3" src={listing.imgUrls[2]} />
                    </div>
                    <div>
                        <img alt="4" id="photo-4" src={listing.imgUrls[3]} />
                    </div>
                    <div>
                        <img alt="5" id="photo-5" src={listing.imgUrls[4]} />
                    </div>
                </figure>
            </div>
            
            <div className="info-reservation">
                <div className="listing-general-info">
                    <div className="listing-general-title">
                        <div>
                            <h3>{`${listing.propertyType} hosted by ${listing.firstName}`}</h3>
                            <p>{detailsFormating()} </p>
                        </div>
                        <img alt="owner" className="profile-pic pic-bigger" src={listing.ownerPic}></img>
                    </div>
                    <div className="description">
                        <p>{listing.description}</p>
                    </div>
                    <div >
                        <h3 id="amenities-title">What this place offers</h3>
                        <ul className="amenities-container">{listingAmens.map(amen => <li key={amen}>{amen}</li>)}</ul>
                    </div>
                </div>
                <ReservationForm />
            </div>
            <ListingsReviews></ListingsReviews>
            <div className="location-component">
                <h3>Where you'll be</h3>
                <p>{listing.city}, {listing.state}, {listing.country}</p>
                <div className="listing-page-map">
                    <ListingMapWrapper listings={[listing]} mapOptions={{ center: { lat: listing.lat, lng: listing.long }, zoom: 16 }}></ListingMapWrapper>
                </div>
            </div>
        </div>
    )
}