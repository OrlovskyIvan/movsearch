import React, { Component } from 'react';
import {Route, Link} from "react-router-dom"

export default class Banlist extends Component {

    render() {

        let match = this.props.match;

        return (
            <div>
                <div>Банлист</div>
                <ul>
                    <li><Link to={`${match.url}/banlist`}>Banlist</Link></li>
                </ul>

                <Route path={`${match.path}/:topicId`} component={Item} />
            </div>
        )
    }
}

const Item = () => (
    <div>Итем</div>
)