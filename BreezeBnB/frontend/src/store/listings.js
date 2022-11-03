import csrfFetch from "./csrf"

const RECEIVE_LISTING = "entities/RECEIVE_LISTING"
const RECEIVE_LISTINGS = "entities/RECEIVE_LISTINGS"

const receiveListing = (listing) => ({
    type: RECEIVE_LISTING,
    listing
})

const receiveListings = (listings) => ({
    type: RECEIVE_LISTINGS,
    listings
})

export const fetchListing = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`)

    let data = await res.json()
    dispatch(receiveListing(data))
}

export const fetchListings = () => async dispatch => {
    const res = await csrfFetch(`/api/listings`)

    let data = await res.json()
    dispatch(receiveListings(data))
}

export const listingsReducer = (state = {}, action) => {
    Object.freeze(state)
    const newState = { ...state }
    
    switch(action.type){
        case RECEIVE_LISTINGS:
            const listings = action.listings
            return { ...newState, ...listings }
        case RECEIVE_LISTING:
            const newListing = action.listing
            return {...state, [newListing.id]: newListing}
        default:
            return state
    }
}

export default listingsReducer