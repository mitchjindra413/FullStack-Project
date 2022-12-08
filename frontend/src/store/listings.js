import csrfFetch from "./csrf"

const RECEIVE_LISTING = "entities/RECEIVE_LISTING"
const RECEIVE_LISTINGS = "entities/RECEIVE_LISTINGS"
export const RECEIVE_LISTING_DETAILS = 'entities/RECEIVE_LISTING_DETAILS'


const receiveListings = (listings) => ({
    type: RECEIVE_LISTINGS,
    listings
})

const receiveListingDetails = (payload) => ({
    type: RECEIVE_LISTING_DETAILS,
    payload
})

export const fetchListing = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`)

    let data = await res.json()
    dispatch(receiveListingDetails(data))
}

export const fetchListings = (filters) => async dispatch => {
    const filterParams = new URLSearchParams(filters)
    const res = await csrfFetch(`/api/listings?${filterParams}`)

    let data = await res.json()
    dispatch(receiveListings(data))
}

export const fetchListingsType = (tags) => async dispatch => {
    const res = await csrfFetch(`/api/listings/tags/${tags}`)

    let data = await res.json()
    dispatch(receiveListings(data))
}

export const fetchTripsListings = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/listings`)

    let data = await res.json()
    dispatch(receiveListings(data))
}

export const listingsReducer = (state = {}, action) => {
    Object.freeze(state)
    
    switch(action.type){
        case RECEIVE_LISTINGS:
            const listings = action.listings
            return { ...listings }
            // return { ...action.reservations }
        case RECEIVE_LISTING:
            const newListing = action.listing
            return {...state, [newListing.id]: newListing}
        case RECEIVE_LISTING_DETAILS:
            const newListingStuff = action.payload.listing
            return { ...state, [newListingStuff.id]: newListingStuff }
        default:
            return state
    }
}

export default listingsReducer