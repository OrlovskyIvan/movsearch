import React, { Component } from 'react';
import { ROUTING } from '../../constants/Routing'

export default class Admin extends Component {

    constructor(props, context) {
        super(props);

    }

    componentDidMount() {
        window.localStorage.clear();
        // const login = window.localStorage.getItem('rr_login')
        // // console.log('вошли в админку');
        // // console.log(this.context.router.history);
        // if (login === 'admin') {
        //     console.log('пропусти')
        // }

    }

    componentWillUnmount() {
        // console.log("Вышли со страницы");
    }

    render() {
        return (
            <div>
                <h2>Admin</h2>
            </div>
        )
    }
}