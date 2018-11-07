import React, { Component } from 'react';
import axios from "axios/index";
import './style/style.sass';
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as FetchingDataActions from "../../actions/FetchingDataActions";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import * as PopularMoviesActions from "../../actions/PopularMoviesActions";
import MovieListPresentationItem from "../../components/MovieListPresentationItem"
// import close from './img/ico-expandless.png'
// import more from './img/ico-expandmore.png'

class MovieListPresentation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMoviesDownloaded: false,
            isListOpened: false,
            moviesMass: []
        }
    }

    handleClick = () => {

        let listId = this.props.listId,
            { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            isMoviesDownloaded = this.state.isMoviesDownloaded,
            isListOpened = this.state.isListOpened;

        console.log(`https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&language=ru`)

        if ( !isMoviesDownloaded ) {

            axios.get(`https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&language=ru`).then((response) => {
                console.log(response)
                this.setState({ moviesMass: response.data.items, isMoviesDownloaded: true})

            }).catch((error) => {
                this.setState({ moviesMass: [ { title: "Запросить фильмы не удалось" } ]})
            });

        }

        this.setState({ isListOpened: !isListOpened })

    }

    render() {

        console.log("------------------------------------------- Компонент MovieListPresentationItem отрендерился ------------------------------------------")

        let name = this.props.name,
            itemCount = this.props.itemCount,
            movieMass = this.state.moviesMass,
            isMoviesDownloaded = this.state.isMoviesDownloaded,
            isListOpened = this.state.isListOpened,
            moviesTemplate = [];

        moviesTemplate = movieMass.map(function (currentItem) {
            return (
                <MovieListPresentationItem id={currentItem.id} title={currentItem.title} vote={currentItem.vote_average} />
            )
        })

        console.log(movieMass)

        return (
            <div className={`movie-list-presentation movie-list-presentation${isListOpened ? '--opened' : ''}`} onClick={this.handleClick}>

                <div className="movie-list-presentation__header">
                    <div className="movie-list-presentation__name">{name} ({itemCount})</div>
                    <div className={`movie-list-presentation__decor`}></div>
                </div>

                <div className="movie-list-presentation__movies">
                    {moviesTemplate}
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movieDBAuthentification: state.movieDBAuthentification
    }
}

function mapDispatchToProps(dispatch) {

    return {
        movieDBAuthentificationActions: bindActionCreators(movieDBAuthentificationActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListPresentation)