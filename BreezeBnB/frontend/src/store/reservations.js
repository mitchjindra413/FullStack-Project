import csrfFetch from "./csrf"


const RECEIVE_RESERVATIONS = 'entities/RECEIVE_RESERVATIONS'
const RECEIVE_RESERVATION = 'entities/RECEIVE_RESERVATION'
const DELETE_RESERVATION = 'enetities/DELETE_RESERVATION'

const receiveReservation = (reservation) => ({
    type: RECEIVE_RESERVATION,
    reservation
})

const receiveReservations = (reservations) => ({
    type: RECEIVE_RESERVATIONS,
    reservations
})

const removeReservation = (reservationId) => async dispatch => ({
    type: DELETE_RESERVATION
})

export const fetchReservation = (reservationId) => async dispatch => {
    const res = await csrfFetch(`/api/reservations/${reservationId}`)

    let data = await res.json()
    dispatch(receiveReservation(data))
}

export const fetchReservations = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}/reservations`)

    let data = await res.json()
    dispatch(receiveReservations(data))
}

export const fetchUsersReservations = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/reservations`)

    let data = await res.json()
    dispatch(receiveReservations(data))
}

export const fetchListingsReservations = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}/reservations`)

    let data = await res.json()
    dispatch(receiveReservations(data))
}

export const createReservation = (reservation) => async dispatch => {
    const res = await csrfFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({reservation: reservation})
    })

    if(res.ok){
        const data = await res.json()
        dispatch(receiveReservation(data))
    }
}

export const updateReservation = (reservation) => async dispatch => {
    const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
        method: 'PUT',
        body: JSON.stringify(reservation)
    })

    if(res.ok){
        let data = await res.json()
        dispatch(receiveReservation(data))
    }
}

export const deleteReservation = (reservationId) => async dispatch => {
    const res = await csrfFetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    })
    
    if(res.ok){
        dispatch(removeReservation(reservationId))
    }
}

export const reservationsReducer = (state = {}, action) => {
    Object.freeze(state)
    const newState = { ...state }

    switch(action.type){
        case RECEIVE_RESERVATION:
            return {...state, [action.reservation.id]: action.reservation}
        case RECEIVE_RESERVATIONS:
            return {...action.reservations}
        case DELETE_RESERVATION:
            const reservationId = action.reservation.id
            delete newState[reservationId]
            return newState
        default:
            return state
    }
}

export default reservationsReducer