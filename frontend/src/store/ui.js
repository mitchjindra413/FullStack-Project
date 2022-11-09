
const SHOW_MODAL = 'ui/SHOW_LOGIN_MODAL'
const HIDE_MODAL = 'ui/HIDE_LOGIN_MODAL'
const SHOW_SIGNUP_MODAL = 'ui/SHOW_SIGNUP_MODAL'
const SHOW_SUCCESSFUL_RESERVATION ='ui/SHOW_SUCCESSFUL_RESERVATION'
const SHOW_RESERVATION_EDIT = 'ui/SHOW_RESERVATION_EDIT'


export const showModal = () => ({
    type: SHOW_MODAL
})

export const hideModal = () => ({
    type: HIDE_MODAL
})

export const showSignupModal = () => ({
    type: SHOW_SIGNUP_MODAL
})

export const showSuccessfulReservation = () => ({
    type: SHOW_SUCCESSFUL_RESERVATION
})

export const showReservationEdit = () => ({
    type: SHOW_RESERVATION_EDIT
})


export const uiReducer = (state = {}, action) => {
    switch(action.type){
        case SHOW_MODAL:
            return {modal: 'login'}
        case HIDE_MODAL:
            return {modal: null}
        case SHOW_SIGNUP_MODAL:
            return {modal: 'signup'}
        case SHOW_SUCCESSFUL_RESERVATION:
            return {modal: 'successfulReservation'}
        case SHOW_RESERVATION_EDIT:
            return {modal: 'reservationEdit'}
        default:
            return state
    }
}