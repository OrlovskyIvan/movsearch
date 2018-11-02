import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom"
import './style/style.sass'

export default class Navigation extends Component {
    render() {
        return (
            <ul className={'msearch__navigation'}>
                <li className={"msearch__navigation-item"}><NavLink to="/" activeClassName='active'>Главная</NavLink></li>
                <li className={"msearch__navigation-item"}><NavLink to='/login' activeClassName='active'>Войти</NavLink></li>
                <li className={"msearch__navigation-item"}><NavLink to="/admin" activeClassName='active'>Профиль</NavLink></li>
                <li className={"msearch__navigation-item"}><NavLink to="/about" activeClassName='active'>About</NavLink></li>
                {/*<li><NavLink to="/contacts" activeClassName='active'>Contacts</NavLink></li>*/}
                <li className={"msearch__navigation-item"}><NavLink to="/list" activeClassName='active'>List</NavLink></li>
                <li className={"msearch__navigation-item"}><NavLink to="/banlist" activeClassName='active'>Banlist</NavLink></li>
            </ul>
        )
    }
}