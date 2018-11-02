import React, { Component } from 'react';
import axios from "axios/index";

export default class MovieListPresentation extends Component {

    constructor(props) {
        this.state = {
            isMoviesDownloaded: false,
            moviesMass: []
        }
    }

    handleClick = () => {
        let { listId } = this.props.listId;

        axios.get()
    }

    render() {


        return (
            <div className="movie-list-presentation" onClick={this.handleClick}>

                <div className="movie-list-presentation__header">
                    <div className="movie-list-presentation__name">{this.props.name}</div>

                    <div className="movie-list-presentation__decor"></div>
                </div>

                <div className="movie-list-presentation__movies">

                </div>

            </div>
        )
    }
}