import React, { Component } from 'react'
import { Link, Route } from "react-router-dom"
import tiestoTheOnlyWayIsUp from "./tiestoTheOnlyWayIsUp"

export default class Genre extends Component {

    render() {

        let match = this.props.match,
            genre = match.params.genre,
            template;
        if (genre === 'house') {
            template = (
                <div>
                    <Link to={`${match.url}/tiesto-the-only-way-is-up`}>tiesto-the-only-way-is-up</Link>
                    <Route path={`${match.path}/:itemId`} component={tiestoTheOnlyWayIsUp} />
                </div>
            )
        } else {
            template = (
                <div>
                    <div className='col-md-12'>Здесь будет список релизов</div>
                </div>
            )
        }

        return (
            <div className='row'>
                <h3 className='col-md-12'>{genre}</h3>

                {template}
            </div>
        )
    }
}