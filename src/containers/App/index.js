import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Navigation from "../../components/Navigation"
import PopularMovies from "../PopularMovies"
import NotFound from "../../components/NotFound"
import requireAuthentication from '../AuthenticatedComponent'
import MovieDBAuthentification from '../MovieDBAuthentification'
import Profile from '../Profile'
import AuthenticateLink from '../AuthenticateLink'
import Movie from '../../components/Movie'
import Search from '../../containers/Search'
import ShowSearchResult from '../ShowSearchResult'

import './css/style.sass'
import './css/style.css'

class App extends Component {

    render() {
        return (
            <BrowserRouter >

                <div className="msearch">

                    <div className="msearch__header">
                        <AuthenticateLink />
                        <Navigation/>
                    </div>
                    <Route exact path="/" component={Search}/>
                    <Switch>
                        <Route exact path="/" component={PopularMovies}/>
                        <Route path='/login' component={MovieDBAuthentification} />
                        <Route path="/admin" component={requireAuthentication(Profile)} />
                        <Route path="/ShowSearchResult" component={ShowSearchResult} />
                        <Route path='/movies/:movieId' component={Movie} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>

            </BrowserRouter>
        )
    }
}

export default App;