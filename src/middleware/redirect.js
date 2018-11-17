import { ROUTING } from '../constants/Routing';

export const redirect = store => next => action => {

    /* Делаем редирект в случае срабатывания события ROUTING */
    if (action.type === ROUTING) {
        action.payload.history[action.payload.method](action.payload.nextUrl);
    }

    return next(action)
}
