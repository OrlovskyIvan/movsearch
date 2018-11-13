import { SAVE_SEARCHED_DATA, SEARCHING } from '../constants/Search'

const initialState = {
    searchDataMass: [],
    searchingStatus: false
}

export default function search(state = initialState, action) {

    switch (action.type) {
        case SAVE_SEARCHED_DATA:
            return {...state, searchDataMass: action.payload };
        case SEARCHING:
            return {...state, searchingStatus: action.payload };
        default:
            return state;
    }

}