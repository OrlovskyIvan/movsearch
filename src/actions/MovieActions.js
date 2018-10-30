import { SAVE_MOVIE_DATA } from '../constants/Movie'

export const saveMovieData = (dataObj) => {
    return {
        type: SAVE_MOVIE_DATA,
        payload: dataObj
    }
}