import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import * as authenticateLinkActions from "../../actions/AuthenticateLinkActions";
import axios from 'axios';
import authenticateLink from "../../reducers/authenticateLink";
import "./css/style.sass";

class Authenticate extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount = () => {

        console.log("Компонент Authenticate смонтирован")
        /* Проверяем активна ли сессия */
        let tokenAndSessionObj = {},
            isSessionActive = undefined,
            { requestTemplate, apiKey } = this.props.movieDBAuthentification,
            { setAuthenticateLinkInfo } = this.props.authenticateLinkActions

        if (localStorage.getItem('tokenAndSession') !== null) {

            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession'));
            console.log("Объект из локалсторэж: " + tokenAndSessionObj)
            axios.get(`${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`).then(function (response) {
                // handle success
                console.log("Запрос аккаунта c sessionId из localStorage прошел успешно")
                console.log(response);

                isSessionActive = true;
                setAuthenticateLinkInfo(response.data.username, response.data.id)
            }).catch(function (error) {
                // handle error
                console.log(error);
                console.log("Запросить аккаунт c sessionId из localStorage не удалось");
                console.log("Очистить localStorage");
                window.localStorage.clear();

            });

            // tokenAndSessionObj.token = JSON.parse(localStorage.getItem('tokenAndSession')).token;
            // tokenAndSessionObj.sessionId = JSON.parse(localStorage.getItem('tokenAndSession')).sessionId;
        }
    }

    render() {

        let { username, id } = this.props.authenticateLink;
        return (
                <div className="msearch__authenticate authenticate">
                    <a href="/login" className="authenticate-link">
                        { username ? (<p className="authenticate__name">{username}</p>) : (<p className="authenticate__name">Вход</p>)}
                        <div className={`authenticate__user-status authenticate__user-status${ username ? "-signed" : "" }`}></div>

                    </a>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movieDBAuthentification: state.movieDBAuthentification,
        authenticateLink: state.authenticateLink
    }
}

function mapDispatchToProps(dispatch) {

    return {
        movieDBAuthentificationActions: bindActionCreators(movieDBAuthentificationActions, dispatch),
        authenticateLinkActions: bindActionCreators(authenticateLinkActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)