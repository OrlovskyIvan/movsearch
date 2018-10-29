import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as FetchingDataActions from "../../actions/FetchingDataActions"
import axios from "axios/index";

const fetchData = (props) => {

    let { url } = this.props.url,
        { fetchingData } = this.props.fetchingDataActions,
        data = null;

    fetchingData(true);

    axios.get(url).then(function (response) {
        // handle success
        console.log("Запрос популярных фильмов прошел успешно")
        console.log(response);
        console.log(response.data.results);

        /* Сохраняем полученные фильмы */
        // saveFetchedPopularFilms(response.data.results);
        fetchingData(false);
        return response.data;

    }).catch(function (error) {
        // handle error
        console.log(error);
        console.log("Запрос популярных фильмов не удался");

        fetchingData(false);
        return false;
    });
}

// function mapStateToProps(state) {
//     return {
//         fetchData: state.fetchData
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//
//     return {
//         fetchingDataActions: bindActionCreators(FetchingDataActions, dispatch)
//     }
//
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(fetchData)