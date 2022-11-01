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

export const fetchListing = (listing) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listing.id}`)

    let data = await res.json()
    dispatch(recieveListing(data))
}

export const fetchListings = () => async dispatch => {
    const res = await csrfFetch(`/api/listings`)

    let data = await res.json()
    dispatch(recieveListings(data))
}

export const entitiesReducer = (state = {}, action) => {
    Object.freeze(state)
    const newState = { ...state }

    switch(action.type){
        case RECIEVE_LISTINGS:
            return { ...newState, listings: action.listings }
        case RECIEVE_LISTING:
            newState.listings[action.listing.id] = action.listing
            return newState
        default:
            return state
    }
}

export default entitiesReducer