import csrfFetch, { storeCSRFToken } from "./csrf"
import { hideModal } from "./ui"

const SET_CURRENT_USER = 'session/setCurrentUser'
const REMOVE_CURRENT_USER = 'session/removeCurrentUser'

const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    }
}

export const login = (user) => async dispatch => {
    const { email, password } = user
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    })
    
    const data = await res.json()
    dispatch(setCurrentUser(data.user))
    if(res.ok){
        dispatch(hideModal())
    }
    return res
}

export const restoreSession = () => async dispatch => {
    let res = await csrfFetch('/api/session')
    storeCSRFToken(res)

    let data = await res.json()
    storeCurrentUser(data.user)
    
    dispatch(setCurrentUser(data.user))
    return res
}

export const storeCurrentUser = (user) => {
    if(user){
        let res = JSON.stringify(user)
        sessionStorage.setItem('currentUser', res)
    } else {
        sessionStorage.removeItem('currentUser')
    }
}

export const signup = (user) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            first_name: user.first_name,
            last_name: user.last_name,
            birthdate: user.birthdate,
            email: user.email,
            password: user.password
        })
    })

    if(res.ok){
        const data = await res.json()
        storeCurrentUser(data.user)
        dispatch(setCurrentUser(data.user))
        dispatch(hideModal())
    }
    return res
}

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if(res.ok){
        storeCurrentUser(null)
        dispatch(removeCurrentUser())
    }
    return res
}

const initialState = { user: JSON.parse(sessionStorage.getItem('currentUser'))}

export const sessionReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.user }
        case REMOVE_CURRENT_USER:
            return { ...state, user: null }
        default:
            return state
    }
}