import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import { Link } from "react-router-dom";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import * as authenticateLinkActions from "../../actions/AuthenticateLinkActions";
import axios from 'axios';
import authenticateLink from "../../reducers/authenticateLink";
import "./css/style.sass";

class Authenticate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userSigned: false
        }

    }

    checkIsSessionWorks = () => {

        let tokenAndSessionObj = {},
            { requestTemplate, apiKey } = this.props.movieDBAuthentification,
            { setAuthenticateLinkInfo } = this.props.authenticateLinkActions,
            { userSigned } = this.props.movieDBAuthentificationActions;


        console.log(localStorage.getItem('tokenAndSession'))

        if (localStorage.getItem('tokenAndSession') !== null) {

            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession'));
            console.log("Объект из локалсторэж: " + tokenAndSessionObj)
            console.log(tokenAndSessionObj)

            axios.get(`${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`).then(function (response) {
                // handle success
                console.log("Запрос аккаунта c sessionId из localStorage прошел успешно")
                console.log(response);

                setAuthenticateLinkInfo(response.data.username, response.data.id);
            }).catch(function (error) {
                // handle error
                console.log(error);
                console.log("Запросить аккаунт c sessionId из localStorage не удалось");
                console.log("Очистить localStorage");
                window.localStorage.clear();
                setAuthenticateLinkInfo('', '');
                // userSigned(false);
            });

        }

    }

    componentDidMount = () => {

        console.log("Компонент Authenticate смонтирован")
        /* Проверяем активна ли сессия */

        this.checkIsSessionWorks();
    }

    componentDidUpdate = (prevProps) => {

        console.log("Компонент Authenticate обновился")

        /* В случае нажатия на кнопку войти в компоненте логин, проверяем залогинен ли пользователь */
        let { isUserSigned } = this.props.movieDBAuthentification,
            localStateUserSigned = this.state.userSigned,
            { setAuthenticateLinkInfo } = this.props.authenticateLinkActions;

        if ( isUserSigned && !localStateUserSigned ) {
            this.checkIsSessionWorks();
            this.setState({ userSigned: true });
        }

        if ( localStorage.getItem('tokenAndSession') == null && localStateUserSigned && !isUserSigned) {
            this.checkIsSessionWorks();
            this.setState({ userSigned: false });
            setAuthenticateLinkInfo('', '');
        }

    }

    render() {

        let { username, id } = this.props.authenticateLink;
        return (
                <div className="msearch__authenticate authenticate">
                    <Link to="/login" className="authenticate-link">
                        { username ? (<p className="authenticate__name">{username}</p>) : (<p className="authenticate__name">Вход</p>)}
                        <div className={`authenticate__user-status authenticate__user-status${ username ? "-signed" : "" }`}></div>

                    </Link>
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