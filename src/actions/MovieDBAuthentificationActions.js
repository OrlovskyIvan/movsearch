import { AUTH_SUCCESS_TOKEN, AUTH_SUCCESS_SESSION, AUTH_SUCCESS_LOGIN, AUTH_SUCCESS_PASSWORD, AUTH_SUCCESS_STATUS } from '../constants/MovieDBAuthentification'

// export function setToken(token) {
//     return {
//         type: AUTH_GET_TOKEN,
//         payload: token
//     }
// }
//
export function userSigned(bool) {
    return {
        type: AUTH_SUCCESS_STATUS,
        payload: bool
    }
}

export const signUser = (dataObj) => {

    return (dispatch) => {

        dispatch({
            type: AUTH_SUCCESS_TOKEN,
            payload: dataObj.token
        });

        dispatch({
            type: AUTH_SUCCESS_SESSION,
            payload: dataObj.sessionId
        });

        dispatch({
            type: AUTH_SUCCESS_LOGIN,
            payload: dataObj.login
        });

        dispatch({
            type: AUTH_SUCCESS_PASSWORD,
            payload: dataObj.password
        });

        dispatch({
            type: AUTH_SUCCESS_STATUS,
            payload: dataObj.status
        });
    }

}