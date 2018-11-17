import React, { Component } from 'react';
import './style/style.sass'

export default class NotFound extends Component {
    render() {
        return (
            <div className={"msearch__not-found"}>
                Страница не найдена. Вернуться на <a href="/" className={"msearch__not-found-link"}>главную</a>?
            </div>
        )
    }
}