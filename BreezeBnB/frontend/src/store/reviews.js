import csrfFetch from "./csrf";
import { RECEIVE_LISTING_DETAILS } from "./listings";

const RECEIVE_REVIEWS = 'entities/RECEIVE_REVIEWS'
const RECEIVE_REVIEW = 'entities/RECEIVE_REVIEW'
const REMOVE_REVIEW = 'entities/REMOVE_REVIEW'

const receiveReviews = (reviews) => ({
    type: RECEIVE_REVIEWS,
    reviews
})

const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review
})

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW
})


export const fetchListingReviews = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}/reviews`)

    if(res.ok){
        const data = await res.json()
        dispatch(receiveReviews(data))
    }
}

export const fetchUserReviews = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/reviews`)

    if (res.ok) {
        const data = await res.json()
        dispatch(receiveReviews(data))
    }
}

export const fetchReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(receiveReviews(data))
    }
}

export const createReview = (review) => async dispatch => {
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })

    if(res.ok){
        const data = await res.json()
        dispatch(receiveReview(data))
    }
}

export const updateReview = (review) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        body: 'PUT',
        body: JSON.stringify(review)
    })

    if(res.ok){
        const data = await res.json()
        dispatch(receiveReview(data))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        dispatch(removeReview(reviewId))
    }
} 

export const reviewsReducer = (state = {}, action) => {
    Object.freeze(state)
    let newState = {...state}
    switch(action.type){
        case RECEIVE_REVIEW:
            return { ...state, [action.review.id]: action.review }
        case RECEIVE_REVIEWS:
            return { ...action.reviews }
        case REMOVE_REVIEW:
            const reviewId = action.review.id
            delete newState[reviewId]
            return newState
        case RECEIVE_LISTING_DETAILS:
            return {...action.payload.reviews}
        default:
            return state
    }
}