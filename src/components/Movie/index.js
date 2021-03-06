import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Loading from "../../components/Loading"
import AddMovieToList from "../../containers/AddMovieToList"
import RatingPresentation from "../RatingPresentation";
import * as FetchingDataActions from "../../actions/FetchingDataActions";
import * as MovieActions from "../../actions/MovieActions";
import './style/style.sass'

class Movie extends Component {

    componentDidMount = () => {

        let { fetchDataRequest } = this.props.fetchingDataActions,
            { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            match = this.props.match,
            movieId = match.params.movieId,
            url = `${requestTemplate}movie/${movieId}?api_key=${apiKey}&language=ru`;

        /* Когда компонент смонтирован сделать запрос за фильмом */
        fetchDataRequest(url);

    }

    componentDidUpdate = (prevProps) => {

        /* После того, как компонент обновился */
        let { clearFetchedData } = this.props.fetchingDataActions,
            { saveMovieData } = this.props.movieActions,
            { fetchedData } = this.props.fetchData;

        /* Сохранить данные в стейт компонента и очистить из фетч */
        if ( fetchedData !== null ) {
            saveMovieData(fetchedData)
            clearFetchedData(null)
        }

    }

    render() {

        let match = this.props.match,
            { username } = this.props.authenticateLink,
            movieId = match.params.movieId,
            { movieDataObj } = this.props.movie,
            { fetchingDataStatus } = this.props.fetchData,
            { basePosterUrl } = this.props.popularMovies,
            genresTemplate = [],
            sizeObj = {};

        const movieStyle = {
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(11.76%, 15.29%, 17.25%, 0.98) 0%, rgba(11.76%, 15.29%, 17.25%, 0.88) 100%), url(${`${basePosterUrl}${movieDataObj.poster_path}`})`,
            backgroundSize: `cover, cover`
        };

        const isObjectEmpty = (obj) => {
            for (var key in obj) {
                return false;
            }
            return true;
        }

        if (!isObjectEmpty(movieDataObj)) {
            genresTemplate = movieDataObj.genres.map(function (currentItem) {
                return (<p className="msearch__movie-genre">{currentItem.name}</p>)
            })
        }

        /* Объект с размерами рейтинга */
        sizeObj.innerRadius = 25
        sizeObj.outerRadius = 46
        sizeObj.width = 100
        sizeObj.height = 100
        sizeObj.cx = 46
        sizeObj.cy = 46
        sizeObj.fill = '#ffffff'
        sizeObj.style = {fontSize: 26}
        sizeObj.x = 50
        sizeObj.y = 59

        /* Формируем объект с данными фильма */

        return (
            <div className="msearch__movie" style={movieStyle}>
                {fetchingDataStatus ?
                    (<Loading />)
                    :
                    (<div className="msearch__movie-inner" >

                        <div className="msearch__movie-left">
                            <div className="msearch__movie-img-wrap">
                                <img src={`${basePosterUrl}${movieDataObj.poster_path}`} alt="" className="msearch__movie-img"/>
                            </div>
                        </div>

                        <div className="msearch__movie-right">

                            <h3 className="msearch__movie-title">{movieDataObj.title}</h3>

                            <div className="msearch__movie-runtime">{`Длительность: ${movieDataObj.runtime} мин.`}</div>

                            <div className="msearch__movie-genres">Жанры: {genresTemplate}</div>

                            <div className="msearch__movie-tagline">{movieDataObj.tagline}</div>

                            <div className="msearch__movie-overview">
                                <div className="msearch__movie-overview-title">Описание:</div>
                                <p className="msearch__movie-overview-caption">{movieDataObj.overview}</p>
                            </div>

                            <div className="msearch__movie-buttons">

                                { username ? (
                                    <AddMovieToList movieId={movieId}/>
                                ) : ("Войдите, чтобы добавить фильм в список.")

                                }

                            </div>

                            <div className="msearch__movie-rating">
                                <RatingPresentation rating={movieDataObj.vote_average} sizeObj={sizeObj} />
                            </div>
                        </div>

                    </div>)
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        fetchData: state.fetchData,
        movieDBAuthentification: state.movieDBAuthentification,
        movie: state.movie,
        popularMovies: state.popularMovies,
        authenticateLink: state.authenticateLink
    }
}

function mapDispatchToProps(dispatch) {

    return {
        fetchingDataActions: bindActionCreators(FetchingDataActions, dispatch),
        movieActions: bindActionCreators(MovieActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
