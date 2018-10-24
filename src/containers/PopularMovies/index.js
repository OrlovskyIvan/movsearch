import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import axios from 'axios';
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import * as PopularMoviesActions from "../../actions/PopularMoviesActions";
import MoviePresentation from "../../components/MoviePresentation";
import './style/style.sass'

class PopularMovies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPageToLoad: 1
        }
    }

    componentDidMount = () => {

        let { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            // { fetchingPopularMovies, dataReseived } = this.props.movieDBAuthentificationActions,
            { fetchingPopularMovies, dataReseived, saveFetchedPopularFilms } = this.props.popularMoviesActions,
            currentPageToLoad = this.state.currentPageToLoad,
            fetchingTemplate = `${requestTemplate}movie/popular?api_key=${apiKey}&language=ru&page=${currentPageToLoad}&region=Russia`;

        /* Запрашиваем популярные фильмы на сегодня */
        // https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=ru&page=1&region=Russia
        axios.get(fetchingTemplate).then(function (response) {
            // handle success
            console.log("Запрос популярных фильмов прошел успешно")
            console.log(response);
            console.log(response.data.results);

            /* Сохраняем полученные фильмы */
            saveFetchedPopularFilms(response.data.results);
        }).catch(function (error) {
            // handle error
            console.log(error);
            console.log("Запрос популярных фильмов не удался");
        });

    }

    render() {

        /* Отрисовываем фильмы */
        let { basePosterUrl, currentFetchedPopularFilmsArray } = this.props.popularMovies,
            popularMoviesTemplate = [];

        popularMoviesTemplate = currentFetchedPopularFilmsArray.map((currentValue, index) => {

            const movieDataObj = {};

            movieDataObj.id = currentValue.id
            movieDataObj.title = currentValue.original_title
            movieDataObj.posterUrl = `${basePosterUrl}${currentValue.poster_path}`
            movieDataObj.genres_id = currentValue.genre_ids
            movieDataObj.caption = currentValue.overview
            movieDataObj.rating = currentValue.vote_average

            return (<MoviePresentation key={index} movieDataObj={movieDataObj}/>)
        })

        console.log("массив в рендере: " + currentFetchedPopularFilmsArray)

        return (
            <div className="msearch__popular-movies">
                {popularMoviesTemplate}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movieDBAuthentification: state.movieDBAuthentification,
        popularMovies: state.popularMovies
    }
}

function mapDispatchToProps(dispatch) {

    return {
        movieDBAuthentificationActions: bindActionCreators(movieDBAuthentificationActions, dispatch),
        popularMoviesActions: bindActionCreators(PopularMoviesActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies)