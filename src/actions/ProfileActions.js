import { SAVE_PROFILE_DATA, FETCHING_PROFILE_DATA_COMPLETE } from '../constants/Profile'

export function saveProfileData(dataObj) {
    return {
        type: SAVE_PROFILE_DATA,
        payload: dataObj
    }
}

export function fetchingProfileDataComplete(status) {
    return {
        type: FETCHING_PROFILE_DATA_COMPLETE,
        payload: status
    }
}