import { combineReducers } from 'redux'
import user from './user'
import movieDBAuthentification from './movieDBAuthentification'
import authenticateLink from './authenticateLink'
import popularMovies from './popularMovies'
import fetchData from './fetchData'
import movie from './movie'
import profile from './profile'
import search from './search'
// import popup from './popup'

export default combineReducers({

    movieDBAuthentification,
    authenticateLink,
    popularMovies,
    fetchData,
    movie,
    profile,
    search

})