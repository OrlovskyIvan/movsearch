import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import * as PopularMoviesActions from "../../actions/PopularMoviesActions";
import * as FetchingDataActions from "../../actions/FetchingDataActions"
import MoviePresentation from "../../components/MoviePresentation";
import Loading from "../../components/Loading";
import Masonry from 'react-masonry-component';

import './style/style.sass'

class PopularMovies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPageToLoad: 1,
            percentPosition: true
        }
    }

    componentDidMount = () => {

        let { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            { fetchDataRequest } = this.props.fetchingDataActions,
            currentPageToLoad = this.state.currentPageToLoad,
            fetchingTemplate = `${requestTemplate}movie/popular?api_key=${apiKey}&language=ru&page=${currentPageToLoad}&region=Russia`;

        /* Запрашиваем популярные фильмы на сегодня */
        fetchDataRequest(fetchingTemplate);
    }

    componentDidUpdate = () => {

        let { fetchedData } = this.props.fetchData,
            { clearFetchedData } = this.props.fetchingDataActions,
            { saveFetchedPopularFilms } = this.props.popularMoviesActions;

        if (fetchedData !== null) {
            saveFetchedPopularFilms(fetchedData.results);
            clearFetchedData(null);
        }
    }

    render() {

        /* Отрисовываем фильмы */
        let { fetchingDataStatus } = this.props.fetchData,
            { basePosterUrl, currentFetchedPopularFilmsArray } = this.props.popularMovies,
            popularMoviesTemplate = [],
            masonryOptions = {
                transitionDuration: 1000,
                stagger: 30,
                gutter: 10
            };

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

        return (
            <div className="msearch__popular-movies-container">
                <h2 className="msearch__popular-movies-title">Популярные фильмы: </h2>
                {fetchingDataStatus ?
                    (<Loading/>) :
                    (<Masonry
                        className={'msearch__popular-movies'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        imagesLoadedOptions={{}} // default {}
                    >
                        {popularMoviesTemplate}
                    </Masonry>)
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movieDBAuthentification: state.movieDBAuthentification,
        popularMovies: state.popularMovies,
        fetchData: state.fetchData
    }
}

function mapDispatchToProps(dispatch) {

    return {
        movieDBAuthentificationActions: bindActionCreators(movieDBAuthentificationActions, dispatch),
        popularMoviesActions: bindActionCreators(PopularMoviesActions, dispatch),
        fetchingDataActions: bindActionCreators(FetchingDataActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies)