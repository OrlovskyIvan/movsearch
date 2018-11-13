import React, { Component } from 'react';
import {BrowserRouter, Route, NavLink, Switch} from "react-router-dom"
import Navigation from "../../components/Navigation"
import PopularMovies from "../PopularMovies"
import Banlist from "../../components/Banlist"
import NotFound from "../../components/NotFound"
// import List from "../../components/List"
// import Genre from "../../components/Genre"
// import Home from "../../components/Home"
import Admin from "../../components/Admin"
import LoginPage from "../../components/LoginPage"
import requireAuthentication from '../AuthenticatedComponent'
import MovieDBAuthentification from '../MovieDBAuthentification'
import Profile from '../Profile'
import AuthenticateLink from '../AuthenticateLink'
import Movie from '../../components/Movie'
import Search from '../../containers/Search'
import ShowSearchResult from '../ShowSearchResult'

import './css/style.sass'
import './css/style.css'

// const history = createBrowserHistory();

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
                        {/*<Route path="/about" component={About}/>*/}
                        {/*<Route path="/contacts" component={Contacts}/>*/}
                        <Route path="/banlist" component={Banlist}/>
                        {/*<Route path="/list" component={List}/>*/}
                        {/*<Route path='/genre/:genre' component={Genre} />*/}
                        <Route path='/movies/:movieId' component={Movie} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>

            </BrowserRouter>
        )
    }
}

export default App;