import { useDispatch } from "react-redux"

export const ListingsIndexItem = ({listing}) => {
    const dispatch = useDispatch()

    const showListing = () => {

    }

    return (
        <div className="index-container" onClick={() => dispatch(showListing())}>
            <div >
                <img className="index-pics" src="https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg"></img> 
            </div>
            <div>
                <div className="index-details-top">
                    <h3 className="index-location">{listing.country === 'United States of America' ? `${listing.city}, ${listing.state}` : `${listing.city}, ${listing.country}`}</h3>
                    <p className="index-rating">Rating</p>
                </div>
                <ul>
                    <li className="index-details">{listing.tagLine}</li>
                    <li className="index-details">{`${listing.numBeds} beds`}</li>
                    <li className="index-price"><span className="price-span-index">{`$${listing.nightPrice}`}</span> night</li>
                </ul>
            </div>
        </div>
    )
}