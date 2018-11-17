import { FETCHING_DATA, FETCHED_DATA, CLEAR_FETCHED_DATA, CHANGE_FETCH_STATUS } from '../constants/FetchData'
import axios from "axios/index";


const payloadFetchState = (status, data) => {

    return (dispatch) => {
        dispatch({
            type: FETCHING_DATA,
            payload: status
        })

        dispatch({
            type: FETCHED_DATA,
            payload: data
        })
    }

}

export const changeFetchStatus = (status) => {
    return {
        type: CHANGE_FETCH_STATUS,
        payload: status
    }
}

export const clearFetchedData = (perem) => {
    return {
        type: CLEAR_FETCHED_DATA,
        payload: perem
    }
}

const fetchDataFunc = (url) => {

    /* Выставляем состояние загрузки данных в true */

    return (dispatch) => {
        dispatch(payloadFetchState(true, null))

        axios.get(url).then(function (response) {

            // handle success
            /* Сохраняем полученные данные в стейт */
            dispatch(payloadFetchState(false, response.data))

        }).catch(function (error) {

            // handle error
            console.log(error);
            dispatch(payloadFetchState(false, {}))

        });
    }


}


export const fetchDataRequest = (url) => {

    return (dispatch) => {

        dispatch(
            fetchDataFunc(url)
        );

    }

}

