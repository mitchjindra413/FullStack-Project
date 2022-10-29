const SHOW_MODAL = 'ui/SHOW_LOGIN_MODAL'
const HIDE_MODAL = 'ui/HIDE_LOGIN_MODAL'

const SHOW_SIGNUP_MODAL = 'ui/SHOW_SIGNUP_MODAL'
const HIDE_SIGNUP_MODAL = 'ui/HIDE_SIGNUP_MODAL'

export const showModal = () => ({
    type: SHOW_MODAL
})

export const hideModal = () => ({
    type: HIDE_MODAL
})

export const showSignupModal = () => ({
    type: SHOW_SIGNUP_MODAL
})


export const uiReducer = (state = {}, action) => {
    switch(action.type){
        case SHOW_MODAL:
            return {modal: 'login'}
        case HIDE_MODAL:
            return {modal: null}
        case SHOW_SIGNUP_MODAL:
            return {modal: 'signup'}
        default:
            return state
    }
}