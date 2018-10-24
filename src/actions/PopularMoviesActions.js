import { FETCHING_POPULAR_MOVIES, DATA_RECEIVED, SAVE_FETCHED_POPULAR_FILMS } from '../constants/PopularMovies'

export function fetchingPopularMovies(status) {
    return {
        type: FETCHING_POPULAR_MOVIES,
        payload: status
    }
}

export function dataReseived(status) {
    return {
        type: DATA_RECEIVED,
        payload: status
    }
}

export function saveFetchedPopularFilms(status) {
    return {
        type: SAVE_FETCHED_POPULAR_FILMS,
        payload: status
    }
}