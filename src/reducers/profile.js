import { SAVE_PROFILE_DATA, FETCHING_PROFILE_DATA_COMPLETE } from '../constants/Profile'

const initialState = {
    profileDataMass: [],
    fetchingComplete: false
}

export default function profile(state = initialState, action) {

    switch (action.type) {

        case SAVE_PROFILE_DATA:

            let newProfileDataMass = state.profileDataMass;
            newProfileDataMass[action.payload.number] = action.payload.dataObj;

            return { ...state, profileDataMass: newProfileDataMass };

        case FETCHING_PROFILE_DATA_COMPLETE:
            return { ...state, fetchingComplete: action.payload };

        default:
            return state;
    }

}