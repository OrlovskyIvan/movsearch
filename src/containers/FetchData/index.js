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
        /* Сохраняем полученные фильмы */
        fetchingData(false);
        return response.data;

    }).catch(function (error) {

        // handle error
        console.log(error);
        fetchingData(false);
        return false;

    });
}
