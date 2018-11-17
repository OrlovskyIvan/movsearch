import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import axios from 'axios';
import './style/style.sass'

class MovieDBAuthentification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: "IvanOrlov",
            password: "bulochka"
        }
    }

    handleLoginChange = e => {
        this.setState({ login: e.target.value });
    };

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    handleSubmit = (e) => {

        e.preventDefault()

        /* Берем из стейта апикей */
        let apiKey = this.props.movieDBAuthentification.apiKey,
            requestTemplate = this.props.movieDBAuthentification.requestTemplate,
            signUser = this.props.movieDBAuthentificationActions.signUser,
            sessionId = '',
            token = '',
            login = this.state.login,
            password = this.state.password,
            signObject = {};

        const authentificateUser = () => {

            /* Запрашиваем токен */
            axios.get(`${requestTemplate}authentication/token/new?api_key=${apiKey}`)
                .then(function (response) {
                    // handle success
                    token = response.data.request_token;

                    /* Регистрация токена */
                    axios.post(`${requestTemplate}authentication/token/validate_with_login?api_key=${apiKey}`, {
                        "username": login,
                        "password": password,
                        "request_token": token
                    }).then(function (response) {

                        /* Запрос id сессии */
                        axios.post(`${requestTemplate}authentication/session/new?api_key=${apiKey}`, {
                            "request_token": token
                        }).then(function (response) {

                            let tokenAndSession = {};

                            sessionId = response.data.session_id;

                            signObject.token = token;
                            signObject.sessionId = sessionId;
                            signObject.login = login;
                            signObject.password = password;
                            signObject.status = true;

                            /* Сохранить token и sessionId в localStorage */
                            tokenAndSession.token = token;
                            tokenAndSession.sessionId = sessionId;

                            let tokenAndSessionString = JSON.stringify(tokenAndSession);
                            localStorage.setItem('tokenAndSession', tokenAndSessionString);

                            signUser(signObject);

                        }).catch(function (error) {
                            console.log(error);
                        })

                    }).catch(function (error) {
                        console.log(error);
                    })
                    /* --------------------*/
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }

        authentificateUser();

    }

    componentDidMount = () => {

        /* Проверяем активна ли сессия */
        let tokenAndSessionObj = {},
            { requestTemplate, apiKey } = this.props.movieDBAuthentification,
            { userSigned } = this.props.movieDBAuthentificationActions;

        if (localStorage.getItem('tokenAndSession') !== null) {

            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession'));

            axios.get(`${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`).then(function (response) {

                // handle success
                userSigned(true);

            }).catch(function (error) {
                // handle error
                console.log(error);
                window.localStorage.clear();
                userSigned(false);
            });

        }

    }

    handleQuit = (e) => {
        e.preventDefault();

        let { requestTemplate, apiKey, sessionId } = this.props.movieDBAuthentification,
            { signUser } = this.props.movieDBAuthentificationActions;

        axios.delete(`${requestTemplate}authentication/session?api_key=${apiKey}&session_id=${sessionId}`).then(function (response) {

            /* Если удалось выйти из аккаунта, очищаем localstorage и стейт */
            let signObject = {}
            // handle success
            localStorage.clear();

            signObject.token = '';
            signObject.sessionId = '';
            signObject.login = '';
            signObject.password = '';
            signObject.status = false;

            signUser(signObject);

        }).catch(function (error) {
            // handle error
            console.log(error);
        });



    }

    render() {

        let login = this.state.login,
            password = this.state.password,
            { isUserSigned } = this.props.movieDBAuthentification;

        return (
            <div className="msearch__login">

                <form action="" className="msearch__form">

                    <div className="msearch__inputs-wrap">
                        <input type="text" className="msearch__login-input" value={login} onChange={this.handleLoginChange} placeholder={"Логин"} disabled={isUserSigned}/>
                        <input type="text" className="msearch__login-password" value={password} onChange={this.handlePasswordChange} placeholder={"Пароль"} disabled={isUserSigned}/>
                    </div>

                    {isUserSigned ? (
                        <button type="submit" className="msearch__login-button" onClick={this.handleQuit}>Выйти</button>
                    ) : (
                        <button type="submit" className="msearch__login-button" onClick={this.handleSubmit}>Войти</button>
                    )}


                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDBAuthentification)