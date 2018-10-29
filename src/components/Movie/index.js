import React, { Component } from 'react';

export default class Movie extends Component {

    componentDidMount = () => {

    }

    render() {

        let match = this.props.match,
            movieId = match.params.movieId;

        console.log(movieId);

        return (

               <div className=""></div>

        )
    }

}