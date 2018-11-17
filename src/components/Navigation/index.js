import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import './style/style.sass'

export default class Navigation extends Component {
    render() {
        return (
            <ul className={'msearch__navigation'}>
                <li className={"msearch__navigation-item"}><NavLink to="/" className="msearch__navigation-item-link" activeClassName='active'>Главная</NavLink></li>
                <li className={"msearch__navigation-item"}><NavLink to='/login' className="msearch__navigation-item-link" activeClassName='active'>Войти</NavLink></li>
                <li className={"msearch__navigation-item"}><NavLink to="/admin" className="msearch__navigation-item-link" activeClassName='active'>Профиль</NavLink></li>
            </ul>
        )
    }
}