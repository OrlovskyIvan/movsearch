import { SET_USER_NAME, SET_USER_ID } from '../constants/AuthenticateLink'
import { AUTH_SUCCESS_STATUS } from '../constants/MovieDBAuthentification'

export const setAuthenticateLinkInfo = (name, id, bool) => {

    return (dispatch) => {

        dispatch({
            type: SET_USER_NAME,
            payload: name
        });

        dispatch({
            type: SET_USER_ID,
            payload: id
        });

        dispatch({
            type: AUTH_SUCCESS_STATUS,
            payload: bool
        })
    }

}