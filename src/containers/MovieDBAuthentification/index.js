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

    componentDidUpdate = () => {
        // console.log("updated")
        // console.log(this.state)
    }

    handleLoginChange = e => {
        this.setState({ login: e.target.value });
    };

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    handleSubmit = (e) => {

        e.preventDefault()
        console.log("some")

        /* Берем из стейта апикей */
        let apiKey = this.props.movieDBAuthentification.apiKey,
            requestTemplate = this.props.movieDBAuthentification.requestTemplate,
            signUser = this.props.movieDBAuthentificationActions.signUser,
            sessionId = '',
            requestTodayTopString = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
            token = '',
            login = this.state.login,
            password = this.state.password,
            signObject = {};

        console.log(this.state.login)
        console.log(this.state.password)


        const authentificateUser = () => {

            /* Запрашиваем токен */
            axios.get(`${requestTemplate}authentication/token/new?api_key=${apiKey}`)
                .then(function (response) {
                    // handle success
                    console.log("Запрос токена прошел успешно")
                    console.log(response);
                    token = response.data.request_token;
                    console.log("Токен: " + token);

                    console.log("Регистрация токена")

                    /* Регистрация токена */
                    axios.post(`${requestTemplate}authentication/token/validate_with_login?api_key=${apiKey}`, {
                        "username": login,
                        "password": password,
                        "request_token": token
                    }).then(function (response) {
                        console.log("Регистрация токена прошла успешно.");
                        console.log(response);

                        /* Запрос id сессии */
                        axios.post(`${requestTemplate}authentication/session/new?api_key=${apiKey}`, {
                            "request_token": token
                        }).then(function (response) {

                            let tokenAndSession = {};

                            console.log("Запрос id сессии удался");
                            console.log(response);
                            sessionId = response.data.session_id;
                            console.log(sessionId);

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
                            console.log("Запрос id сессии не удался");
                        })

                    }).catch(function (error) {
                        console.log(error);
                        console.log("Регистрация токена не удалась.");
                    })
                    /* --------------------*/
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    console.log("Запросить token не удалось");
                })
        }

        authentificateUser();

    }

    componentDidMount = () => {
        console.log("Компонент смонтирован")
        /* Проверяем активна ли сессия */
        let tokenAndSessionObj = {},
            isSessionActive = undefined,
            { requestTemplate, apiKey } = this.props.movieDBAuthentification,
            { userSigned } = this.props.movieDBAuthentificationActions;

        if (localStorage.getItem('tokenAndSession') !== null) {

            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession'));
            console.log("Объект из локалсторэж: " + tokenAndSessionObj)
            axios.get(`${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`).then(function (response) {
                // handle success
                console.log("Запрос аккаунта c sessionId из localStorage прошел успешно")
                console.log(response);

                userSigned(true);

            }).catch(function (error) {
                // handle error
                console.log(error);
                console.log("Запросить аккаунт c sessionId из localStorage не удалось");
                console.log("Очистить localStorage");
                window.localStorage.clear();
                userSigned(false);
            });

            // tokenAndSessionObj.token = JSON.parse(localStorage.getItem('tokenAndSession')).token;
            // tokenAndSessionObj.sessionId = JSON.parse(localStorage.getItem('tokenAndSession')).sessionId;
        }

        // let stateToggleToLocalStorage = JSON.stringify(stateToggle);
        // localStorage.setItem('alarmsStash', stateToggleToLocalStorage);
    }

    handleQuit = (e) => {
        e.preventDefault();

        let { requestTemplate, apiKey, sessionId } = this.props.movieDBAuthentification,
            { signUser } = this.props.movieDBAuthentificationActions;

        axios.delete(`${requestTemplate}authentication/session?api_key=${apiKey}&session_id=${sessionId}`).then(function (response) {

            /* Если удалось выйти из аккаунта, очищаем localstorage и стейт */
            let signObject = {}
            // handle success
            console.log("Выход из аккаунта прошел успешно")
            console.log(response);
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
            console.log("Выйти из аккаунта не удалось");
        });



    }

    render() {

        let login = this.state.login,
            password = this.state.password,
            { isUserSigned } = this.props.movieDBAuthentification;
            console.log(login + " " + password);
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