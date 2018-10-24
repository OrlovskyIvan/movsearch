import React, { Component } from 'react';
import './style/style.sass'


export default class MoviePresentation extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {



        return (
            <div className="msearch__movie-presentation movie-presentation">

                <div className="movie-presentation__top">
                    <h4 className="movie-presentation__title">Фильм, фильм, фильм!</h4>

                    <div className="movie-presentation__img-wrap">
                        <img src="" alt="" className="movie-presentation__img"/>
                    </div>

                    <div className="movie-presentation__rating">

                    </div>
                </div>

                <div className="movie-presentation__bottom">

                </div>

            </div>
        )
    }
}