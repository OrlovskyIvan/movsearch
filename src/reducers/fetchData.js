import {FETCHING_DATA, FETCHED_DATA, CLEAR_FETCHED_DATA} from '../constants/FetchData'

const initialState = {
    fetchingDataStatus: false,
    fetchedData: null
}

export default function fetchData(state = initialState, action) {

    switch (action.type) {
        case FETCHING_DATA:
            return {...state, fetchingDataStatus: action.payload };
        case FETCHED_DATA:
            return {...state, fetchedData: action.payload };
        case CLEAR_FETCHED_DATA:
            return {...state, fetchedData: action.payload };
        default:
            return state;
    }

}


