import { AUTH_SUCCESS_TOKEN, AUTH_SUCCESS_SESSION, AUTH_SUCCESS_LOGIN, AUTH_SUCCESS_PASSWORD, AUTH_SUCCESS_STATUS } from '../constants/MovieDBAuthentification'

// const initialState = JSON.parse(window.localStorage.getItem('rr_user')) || {}

const initialState = {
    apiKey: '32e420ab16653556d7c0930d76c7a59a',
    requestTemplate: 'https://api.themoviedb.org/3/',
    token: '',
    sessionId: '',
    login: '',
    password: '',
    isUserSigned: false,
    localStorageToken: (localStorage.getItem('tokenAndSession') !== null) ? JSON.parse(localStorage.getItem('tokenAndSession')).token : {},
    localStorageSession: (localStorage.getItem('tokenAndSession') !== null) ? JSON.parse(localStorage.getItem('tokenAndSession')).sessionId : {}
}

export default function movieDBAuthentification(state = initialState, action) {

    switch (action.type) {
        case AUTH_SUCCESS_TOKEN:
            return {...state, token: action.payload };
        case AUTH_SUCCESS_SESSION:
            return {...state, sessionId: action.payload };
        case AUTH_SUCCESS_LOGIN:
            return {...state, login: action.payload };
        case AUTH_SUCCESS_PASSWORD:
            return {...state, password: action.payload };
        case AUTH_SUCCESS_STATUS:
            return {...state, isUserSigned: action.payload };
        default:
            return state;
    }

}