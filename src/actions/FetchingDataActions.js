import { FETCHING_DATA, FETCHED_DATA, CLEAR_FETCHED_DATA } from '../constants/FetchData'
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

export const clearFetchedData = (perem) => {
    return {
        type: CLEAR_FETCHED_DATA,
        payload: perem
    }
}
// const payloadFetchState = (state) => {
//     return {
//         type: FETCHING_DATA,
//         payload: status
//     }
// }
//
// const payloadFetchData = (state) => {
//     return {
//         type: FETCHED_DATA,
//         payload: data
//     }
// }

const fetchDataFunc = (url) => {

    /* Выставляем состояние загрузки данных в true */

    return (dispatch) => {
        dispatch(payloadFetchState(true, null))

        axios.get(url).then(function (response) {
            // handle success
            console.log("Запрос данных удался")
            console.log(response);
            console.log(response.data.results);

            /* Сохраняем полученные данные в стейт */
            dispatch(payloadFetchState(false, response.data))


        }).catch(function (error) {
            // handle error
            console.log(error);
            console.log("Запрос данных не удался");

            dispatch(payloadFetchState(false, null))
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

