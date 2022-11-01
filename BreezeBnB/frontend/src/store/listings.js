import csrfFetch from "./csrf"

const RECIEVE_LISTING = "entities/RECIEVE_LISTING"
const RECIEVE_LISTINGS = "entities/RECIEVE_LISTINGS"

const recieveListing = (listing) => ({
    type: RECIEVE_LISTING,
    listing
})

const recieveListings = (listings) => ({
    type: RECIEVE_LISTINGS,
    listings
})

export const fetchListing = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`)

    let data = await res.json()
    dispatch(recieveListing(data))
}

export const fetchListings = () => async dispatch => {
    const res = await csrfFetch(`/api/listings`)

    let data = await res.json()
    dispatch(recieveListings(data))
}

export const listingsReducer = (state = {}, action) => {
    Object.freeze(state)
    const newState = { ...state }
    // debugger
    switch(action.type){
        case RECIEVE_LISTINGS:
            const listings = action.listings
            return { ...newState, ...listings }
        case RECIEVE_LISTING:
            const newListing = action.listing
            return {...state, [newListing.id]: newListing}
        default:
            return state
    }
}

export default listingsReducer