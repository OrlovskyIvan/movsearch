import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import { Link } from "react-router-dom";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import * as authenticateLinkActions from "../../actions/AuthenticateLinkActions";
import axios from 'axios';
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
            { setAuthenticateLinkInfo } = this.props.authenticateLinkActions;


        if (localStorage.getItem('tokenAndSession') !== null) {

            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession'));

            axios.get(`${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`).then(function (response) {

                // handle success
                setAuthenticateLinkInfo(response.data.username, response.data.id);

            }).catch(function (error) {

                // handle error
                console.log(error);
                window.localStorage.clear();
                setAuthenticateLinkInfo('', '');

            });

        }

    }

    componentDidMount = () => {

        /* Проверяем активна ли сессия */
        this.checkIsSessionWorks();

    }

    componentDidUpdate = (prevProps) => {

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

        let { username } = this.props.authenticateLink;
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