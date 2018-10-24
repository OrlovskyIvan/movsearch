import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <div className={"ms__notFound"}>
                Страница не найдена. Вернуться на <a href="/">главную</a>?
            </div>
        )
    }
}