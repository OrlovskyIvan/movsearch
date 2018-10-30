import { SAVE_MOVIE_DATA } from '../constants/Movie'

const initialState = {
    movieDataObj: {}
}

export default function movie(state = initialState, action) {

    switch (action.type) {
        case SAVE_MOVIE_DATA:
            let newMovieDataString = JSON.stringify(action.payload),
                newMovieDataObj = JSON.parse(newMovieDataString);
            return {...state, movieDataObj: newMovieDataObj };
        default:
            return state;
    }

}