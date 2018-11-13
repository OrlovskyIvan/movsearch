import { SAVE_SEARCHED_DATA, SEARCHING } from '../constants/Search'
import { ROUTING } from "../constants/Routing"

export function saveSearchedData(dataMass) {
    return {
        type: SAVE_SEARCHED_DATA,
        payload: dataMass
    }
}

export function setSearchingStatus(status) {
    return {
        type: SEARCHING,
        payload: status
    }
}

export function routeToShowSearchResult(history) {
    return {
        type: ROUTING,
        payload: {
            nextUrl: '/ShowSearchResult',
            history: history,
            method: 'replace'
        }
    }
}

export const setSearch = (dataMass, status) => {

    return (dispatch) => {

        dispatch({
            type: SAVE_SEARCHED_DATA,
            payload: dataMass
        });

        dispatch({
            type: SEARCHING,
            payload: status
        });

    }

}