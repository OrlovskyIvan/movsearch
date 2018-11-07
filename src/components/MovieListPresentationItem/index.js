import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style/style.sass'

export default function MovieListPresentationItem(props) {

    return (
        <Link to={`/movies/${props.id}`} className={"movie-presentation__link-container"}>
            <div className="movie-list-presentation-movie">

                <div className="movie-list-presentation-movie-name">
                    {props.title}
                </div>

                <div className="movie-list-presentation-movie-rating">
                    Рейтинг: { ( props.vote * 10 ) }%
                </div>

                { props.rating ? (
                    <div className="movie-list-presentation-myrate">Моя оценка: {props.rating}</div>
                ) : ("")

                }
            </div>
        </Link>
    )

}