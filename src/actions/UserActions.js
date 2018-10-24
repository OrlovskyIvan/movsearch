import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/User'
import { ROUTING } from '../constants/Routing'

export function login(payload) {
    return (dispatch) => {

        dispatch({
            type: LOGIN_REQUEST
        })

        setTimeout(() => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    name: payload.name,
                    isAuthenticated: true
                }
            })

            dispatch({
                type: ROUTING,
                payload: {
                    nextUrl: '/admin',
                    history: payload.history,
                    method: 'replace'
                }
            })
        }, 2000)



    }
}

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    }
}
