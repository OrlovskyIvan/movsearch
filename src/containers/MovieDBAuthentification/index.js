import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import axios from 'axios';

class MovieDBAuthentification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: "IvanOrlov",
            password: "bulochka"
        }
    }

    // componentDidMount = () => {

        /* Берем из стейта апикей */
        // let apiKey = this.props.movieDBAuthentification.apiKey,
        //     requestTemplate = this.props.movieDBAuthentification.requestTemplate,
        //     guestSessionId = '',
            // today = new Date(),
            // day = today.getDate().toString().length < 2 ? "0" + today.getDate() : today.getDate(),
            // month = (today.getMonth()+1).toString().length < 2 ? "0" + (today.getMonth()+1) : (today.getMonth()+1),
            // year = today.getFullYear(),
            // requestTodayTopString = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
            // token = '';
        // console.log(today.getMonth().length);
        // console.log(requestTodayTopString);

        // fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${}`)

        // fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`).then(function(response) {
        //
        //     if(response.ok) {
        //         return response.json();
        //     }
        //     throw new Error('Network response was not ok.');

        // }).then(function (response) {
            /* Сохраняем токен */
            // token = response.request_token;
            // console.log(token);
        // }).then(function () {
            // console.log("формирование запроса с токеном");
            // let myHeaders = new Headers();
            // myHeaders.append('Access-Control-Allow-Origin', '*');
            // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
            // // myHeaders.append('Access-Control-Allow-Origin', '*');
            // console.log("отправился запрос");
            // var myInit = { method: 'GET',
            //     headers: myHeaders,
            //     mode: 'cors',
            //     cache: 'default' };
            //
            // var myRequest = new Request(`https://www.themoviedb.org/authenticate/${token}`);

            /* Авторизируем токен */
        //     fetch(`https://www.themoviedb.org/authenticate/${token}`).then(function (response) {
        //         console.log(response);
        //     })
        // });



        /* Делаем запрос */
        // fetch(`${requestTemplate}authentication/guest_session/new?api_key=${apiKey}`).then(function (response) {
        //
        //     console.log(response)
        //
        //     if(response.ok) {
        //         return response.json();
        //     }
        //
        //     throw new Error('Network response was not ok.');
        //
        // }).then(function (response) {
        //
        //     /* Сохраняем id сессии */
        //     guestSessionId = response.guest_session_id;
        //     console.log(guestSessionId);
        //
        //         // let myHeaders = new Headers();
        //         // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        //         // myHeaders.append('Access-Control-Allow-Origin', '*');
        //         // myHeaders.append('Access-Control-Allow-Headers');
        //
        //         console.log("отправился запрос");
        //
        //         let myInit = { method: 'GET',
        //             headers: {
        //                 'Access-Control-Allow-Origin': 'http://localhost:3000',
        //                 'Access-Control-Allow-Origin': '*',
        //                 'Access-Control-Allow-Headers': true
        //             },
        //             mode: 'cors',
        //             cache: 'default' };
        //         console.log('запрос отправлен')
        //         // let myRequest = new Request(requestTodayTopString);
        //         console.log('запрос отправлен')
        //
        //     /* Делаем запрос за сегодняшним топом */
        //     fetch(requestTodayTopString).then(function (response) {
        //         console.log('запрос получен')
        //
        //         console.log(response);
        //
        //         if(response.ok) {
        //             return response.json();
        //         }
        //
        //         throw new Error('Network response was not ok.');
        //
        //     }).then(function (response) {
        //
        //         console.log('today top')
        //         console.log(response)
        //     })
        // })


        // fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`).then(function(response) {
        //
        //     if(response.ok) {
        //         return response.json();
        //     }
        //     throw new Error('Network response was not ok.');
        //
        // }).then(function (response) {
        //     /* Сохраняем токен */
        //    token = response.request_token;
        // }).then(function () {
        //     console.log("формирование запроса с токеном");
        //     let myHeaders = new Headers();
        //     myHeaders.append('Access-Control-Allow-Origin', '*');
        //     myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        //     // myHeaders.append('Access-Control-Allow-Origin', '*');
        //     console.log("отправился запрос");
        //     var myInit = { method: 'GET',
        //         headers: myHeaders,
        //         mode: 'cors',
        //         cache: 'default' };
        //
        //     var myRequest = new Request(`https://www.themoviedb.org/authenticate/${token}`);
        //
        //     /* Авторизируем токен */
        //     fetch(myRequest, myInit).then(function (response) {
        //         console.log(response);
        //     })
        // });

    // }

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
            //'https://api.themoviedb.org/3/'
            sessionId = '',
            // today = new Date(),
            // day = today.getDate().toString().length < 2 ? "0" + today.getDate() : today.getDate(),
            // month = (today.getMonth()+1).toString().length < 2 ? "0" + (today.getMonth()+1) : (today.getMonth()+1),
            // year = today.getFullYear(),
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

                            signUser(signObject);

                            let tokenAndSessionString = JSON.stringify(tokenAndSession);
                            localStorage.setItem('tokenAndSession', tokenAndSessionString);

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
            { requestTemplate, apiKey } = this.props.movieDBAuthentification;

        if (localStorage.getItem('tokenAndSession') !== null) {

            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession'));
            console.log("Объект из локалсторэж: " + tokenAndSessionObj)
            axios.get(`${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`).then(function (response) {
                // handle success
                console.log("Запрос аккаунта c sessionId из localStorage прошел успешно")
                console.log(response);

                isSessionActive = true;

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

        // let stateToggleToLocalStorage = JSON.stringify(stateToggle);
        // localStorage.setItem('alarmsStash', stateToggleToLocalStorage);
    }

    handleSessionCheck = (e) => {
        e.preventDefault();

        console.log("Session check")

        let { requestTemplate, apiKey, token, sessionId, login, password, isUserSigned } = this.props.movieDBAuthentification;

        console.log( requestTemplate, apiKey, token, sessionId, login, password, isUserSigned);

        axios.get(`${requestTemplate}account?api_key=${apiKey}&session_id=${sessionId}`).then(function (response) {
            // handle success
            console.log("Запрос аккаунта прошел успешно")
            console.log(response);

        }).catch(function (error) {
            // handle error
            console.log(error);
            console.log("Запросить аккаунт не удалось");
        });
    }

    render() {

        let login = this.state.login,
            password = this.state.password;
            console.log(login + " " + password);
        return (
            <div className="msearch__login">

                <form action="" className="msearch__form">

                    <div className="msearch__inputs-wrap">
                        <input type="text" className="msearch__login-input" value={login} onChange={this.handleLoginChange}/>
                        <input type="text" className="msearch__login-password" value={password} onChange={this.handlePasswordChange}/>
                    </div>

                    <input type="submit" className="msearch__login-button" onClick={this.handleSubmit}/>

                </form>
                <a href="#" onClick={this.handleSessionCheck}>Проверка сессии</a>
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