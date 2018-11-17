import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from "axios";
import Transition from 'react-transition-group/Transition'
import "./style/style.sass"
import {bindActionCreators} from "redux";
import * as ProfileActions from "../../actions/ProfileActions";

const defaultStyle = {
    transition: `opacity 500ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
};

class AddMovieToList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPopperOpened: false,
            duration: 1000,
            listsMass: [],
            selectedListId: undefined,
            movieAddedToList: undefined
        }

    }

    componentDidMount = () => {

        let { iD } = this.props.authenticateLink,
            { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession')),
            /* Запрос созданных листов */
            listsUrl = `${requestTemplate}account/${iD}/lists?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}&language=ru&page=1`,
            /* Запрос любимых фильмов */
            favouriteUrl = `${requestTemplate}account/${iD}/favorite/movies?api_key=${apiKey}&language=ru&session_id=${tokenAndSessionObj.sessionId}&sort_by=created_at.asc&page=1`,
            listsMass = [];

        Promise.all([
            axios.get(listsUrl),
            axios.get(favouriteUrl)
        ]).then(([listsUrlRes, favouriteUrlRes]) => {

            listsMass = listsUrlRes.data.results.map((currentItem) => {

                let obj = {};

                obj.id = currentItem.id;
                obj.name = currentItem.name;

                return obj;

            })

            this.setState({ listsMass: listsMass, selectedListId: listsMass[0].id })

        }).catch(function (error) {

            console.log(error)

            this.setState({ listsMass: [] })

        });

    }

    handleAddButtonClick = () => {

        this.setState({
            isPopperOpened: !this.state.isPopperOpened
        })

    }

    handleSelectList = (e) => {

        this.setState({ selectedListId: e.target.value })
    }

    onListAdd = () => {
        let selectedListId = this.state.selectedListId,
            { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession')),
            movieId = this.props.movieId,
            url = `${requestTemplate}list/${selectedListId}/add_item?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}&media_id=${movieId}`;

        axios.post(url).then((response) => {

            this.setState({ movieAddedToList: "Фильм добавлен." })

            setTimeout(() => {
                this.setState({ movieAddedToList: "" })
            }, 1000)

        }).catch((error) => {

            console.log(error)

            this.setState({ movieAddedToList: "Ошибка." })

            setTimeout(() => {
                this.setState({ movieAddedToList: "" })
            }, 1000)

        })

    }

    render() {

        let isPopperOpened = this.state.isPopperOpened,
            duration = this.state.duration,
            listsMass = this.state.listsMass,
            movieAddedToList = this.state.movieAddedToList,
            optionsTemplate = [],
            isSelectDisabled = true;

        if ( listsMass.length > 0 ) {

            optionsTemplate = listsMass.map((currentItem) => {
                return (<option value={currentItem.id}>{currentItem.name}</option>)
            })

            isSelectDisabled = false;
        }

        return(

            <div className="msearch__movie-add-container">
                <div className="msearch__movie-add" onClick={this.handleAddButtonClick}></div>

                <Transition in={isPopperOpened} timeout={duration}>
                    {(state) => (
                        <div className="msearch__movie-add-popper" style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            <h3 className="msearch__movie-add-title">Добавить фильм в:</h3>

                            <select disabled={isSelectDisabled} className={"msearch__movie-add-select"} onChange={this.handleSelectList}>
                                {optionsTemplate}
                            </select>

                            <div className="msearch__movie-add-status">
                                {movieAddedToList}
                            </div>

                            <div className="msearch__movie-add-button" onClick={this.onListAdd}>Ок</div>
                        </div>
                    )}
                </Transition>

            </div>

        )
    }

}


function mapStateToProps(state) {

    return {
        authenticateLink: state.authenticateLink,
        movieDBAuthentification: state.movieDBAuthentification
    }

}

function mapDispatchToProps(dispatch) {

    return {
        profileActions: bindActionCreators(ProfileActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieToList)