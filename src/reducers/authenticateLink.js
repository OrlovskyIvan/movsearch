import { SET_USER_NAME, SET_USER_ID } from '../constants/AuthenticateLink'

const initialState = {
    username: "",
    iD: ""
}

export default function authenticateLink(state = initialState, action) {

    switch (action.type) {
        case SET_USER_NAME:
            return {...state, username: action.payload };
        case SET_USER_ID:
            return {...state, iD: action.payload };
        default:
            return state;
    }

}