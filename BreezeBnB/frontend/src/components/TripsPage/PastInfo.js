export const PastInfo = (reservation) => {


    return (
        <div className="past-trip">
            <Link to={`/listings/${reservation.listingId}`}>
                <div>
                    <img className="past-img" src={reservation.imgUrls[0]}></img>
                </div>
                <div>
                    <h4>{reservation.listingCity}</h4>
                    <p>Hosted by {reservation.listingOwner}</p>
                    <p>Date</p>
                </div>
            </Link>
        </div>
    )
    
}