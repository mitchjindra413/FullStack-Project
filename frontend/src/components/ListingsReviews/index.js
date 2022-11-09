import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ReviewsItem } from "./ReviewsItem"
import './ListingsReviews.css'

export const ListingsReviews = () => {

    const getReviews = (state) => {
        return state.entities.reviews ? Object.values(state.entities.reviews) : []
    }
    const reviews = useSelector(getReviews)
    const {listingId} = useParams()
    const listing = useSelector(state => state.entities.listings[listingId])

    const [clean, setClean] = useState(0)
    const [com, setCom] = useState(0)
    const [check, setCheck] = useState(0)
    const [acc, setAcc] = useState(0)
    const [loc, setLoc] = useState(0)
    const [val, setVal] = useState(0)

    const avgElements = () => {
        let tempClean = 0
        let tempAcc = 0
        let tempCheck = 0
        let tempCom = 0
        let tempLoc = 0
        let tempVal = 0
        
        reviews.forEach(review => {
            tempClean += review.cleanliness
            tempAcc += review.accuracy
            tempCheck += review.checkIn
            tempCom += review.communication
            tempLoc += review.location
            tempVal += review.value
        })

        setClean(Math.round(10 * (tempClean / reviews.length)) / 10)
        setAcc(Math.round(10 * (tempAcc / reviews.length)) / 10)
        setCheck(Math.round(10 * (tempCheck / reviews.length)) / 10)
        setCom(Math.round(10 * (tempCom / reviews.length)) / 10)
        setLoc(Math.round(10 * (tempLoc / reviews.length)) / 10)
        setVal(Math.round(10 * (tempVal / reviews.length)) / 10)

    }

    const valueFormating = (value) => {
        let string = value.toString()
        
        if(string.length === 1) return string.concat('.0')
        return string
    }

    useEffect(() => {
        avgElements()
    }, [reviews.length])

    return (
        <div className="review-container">
            <h3>★ {listing.totalReviews} • {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</h3>
            <div className="reviews-figure">
                <div className="category">
                    <p>Cleanliness </p>
                    <div className="progress-div">
                        <progress value={clean} max='5'></progress>
                        <p>{valueFormating(clean)}</p>
                    </div>
                </div>
                <div className="category">
                    <p>Accuracy </p>
                    <div className="progress-div">
                        <progress value={acc} max='5'></progress>
                        <p>{valueFormating(acc)}</p>
                    </div>
                </div>
                <div className="category">
                    <p>Communication </p>
                    <div className="progress-div"> 
                        <progress value={com} max='5'></progress>
                        <p>{valueFormating(com)}</p>
                    </div>
                </div>
                <div className="category">
                    <p>Location </p>
                    <div className="progress-div">
                        <progress value={clean} max='5'></progress>
                        <p>{valueFormating(clean)}</p>
                    </div>
                </div>
                <div className="category">
                    <p>Check-in </p>
                    <div className="progress-div">
                        <progress value={check} max='5'></progress>
                        <p>{valueFormating(check)}</p>
                    </div>
                </div>
                <div className="category">
                    <p>Value </p>
                    <div className="progress-div">
                        <progress value={val} max='5'></progress>
                        <p>{valueFormating(val)}</p>
                    </div>
                </div>
            </div>
            <div className="single-review">
                {reviews.map(review => <ReviewsItem key={review.id} review={review}></ReviewsItem>)}
            </div>
        </div>
    )
}

