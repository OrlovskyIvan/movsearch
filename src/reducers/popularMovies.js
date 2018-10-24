import { FETCHING_POPULAR_MOVIES, DATA_RECEIVED, SAVE_FETCHED_POPULAR_FILMS } from '../constants/PopularMovies'

const initialState = {
    fetchingPopularMovies: false,
    dataReceived: false,
    currentFetchedPopularFilmsArray: []
}

export default function popularMovies(state = initialState, action) {

    switch (action.type) {
        case FETCHING_POPULAR_MOVIES:
            return {...state, fetchingPopularMovies: action.payload };
        case DATA_RECEIVED:
            return {...state, dataReceived: action.payload };
        case SAVE_FETCHED_POPULAR_FILMS:
            return {...state, currentFetchedPopularFilmsArray: action.payload };
        default:
            return state;
    }

}