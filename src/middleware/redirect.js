import React, { Component } from 'react';
import { Route } from "react-router-dom"
import { ROUTING } from '../constants/Routing';
import { createBrowserHistory } from 'history';
import { browserHistory } from 'react-router';
import { Redirect } from 'react-router-dom'

// let history = createBrowserHistory();

export const redirect = store => next => action => {

    /* Делаем редирект в случае срабатывания события ROUTING */

    if (action.type === ROUTING) {
        action.payload.history[action.payload.method](action.payload.nextUrl);
    }

    return next(action)
}
