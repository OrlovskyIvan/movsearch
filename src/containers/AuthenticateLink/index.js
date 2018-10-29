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

    checkIsSessionWorks = () => {

        let tokenAndSessionObj = {},
            { requestTemplate, apiKey } = this.props.movieDBAuthentification,
            { setAuthenticateLinkInfo } = this.props.authenticateLinkActions,
            { userSigned } = this.props.movieDBAuthentificationActions,
            url = `${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`

        console.log(localStorage.getItem('tokenAndSession'))

        if (localStorage.getItem('tokenAndSession') !== null) {

            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession'));
            console.log("Объект из локалсторэж: " + tokenAndSessionObj)

            axios.get(url).then(function (response) {
                // handle success
                console.log("Запрос аккаунта c sessionId из localStorage прошел успешно")
                console.log(response);

                setAuthenticateLinkInfo(response.data.username, response.data.id, true);
            }).catch(function (error) {
                // handle error
                console.log(error);
                console.log("Запросить аккаунт c sessionId из localStorage не удалось");
                console.log("Очистить localStorage");
                localStorage.clear();
                // userSigned(false);
            });

        }

    }

    componentDidMount = () => {

        console.log("Компонент Authenticate смонтирован")
        /* Проверяем активна ли сессия */

        this.checkIsSessionWorks();
    }

    componentDidUpdate = () => {
        console.log("Обновился authenticate")
        this.checkIsSessionWorks();
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
        movieDBAuthentification: state.movieDBAuthentification
    }
}

function mapDispatchToProps(dispatch) {

    return {
        movieDBAuthentificationActions: bindActionCreators(movieDBAuthentificationActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)