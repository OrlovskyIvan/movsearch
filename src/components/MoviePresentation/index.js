import React, { Component } from 'react';
import RatingPresentation from "../RatingPresentation";
import { Link } from "react-router-dom";
import './style/style.sass'


export default class MoviePresentation extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        const movieDataObj = this.props.movieDataObj;

        if (movieDataObj.caption.length < 1) {
            movieDataObj.caption = "Описание отсутствует";
        }

        return (
            <Link to={`/movies/${movieDataObj.id}`} className={"movie-presentation__link-container"}>
                <div className="msearch__movie-presentation movie-presentation">

                    <div className="movie-presentation__top">
                        <h4 className="movie-presentation__title">{movieDataObj.title}</h4>

                        <div className="movie-presentation__img-wrap">
                            <img src={movieDataObj.posterUrl} alt="" className="movie-presentation__img"/>
                        </div>

                        <div className="movie-presentation__rating">
                            <RatingPresentation rating={movieDataObj.rating} sizeObj={false} />
                        </div>
                    </div>

                    <div className="movie-presentation__bottom">
                        {movieDataObj.caption}
                    </div>

                </div>
            </Link>
        )
    }
}