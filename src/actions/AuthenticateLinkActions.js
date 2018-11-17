import { SET_USER_NAME, SET_USER_ID } from '../constants/AuthenticateLink'

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

    }

}