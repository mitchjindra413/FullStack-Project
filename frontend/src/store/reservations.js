import csrfFetch from "./csrf"
import { showSuccessfulReservation } from "./ui"
import { RECEIVE_LISTING_DETAILS } from "./listings"

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

const removeReservation = (reservationId) => ({
    type: DELETE_RESERVATION,
    reservationId
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
        dispatch(showSuccessfulReservation())
    }

    return res
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

    return res
}

export const deleteReservation = (reservationId) => async dispatch => {
    const res = await csrfFetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        dispatch(removeReservation(reservationId))
    }

    return res
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
            delete newState[action.reservationId]
            return newState
        case RECEIVE_LISTING_DETAILS:
            return {...action.payload.reservations}
        default:
            return state
    }
}

export default reservationsReducer