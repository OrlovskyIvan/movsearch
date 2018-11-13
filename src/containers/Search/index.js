import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import { bindActionCreators } from "redux"
import MovieListPresentationItem from "../../components/MovieListPresentationItem"
import * as FetchingDataActions from "../../actions/FetchingDataActions"
import * as SearchActions from "../../actions/SearchActions"
import PropTypes from 'prop-types'
import "./style/style.sass"


class Search extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context)

        this.state = {
            currentQueryString: "",
            disabledSearchButton: true,
            isSearchFocused: false,
            elementsToShow: 5
        }

        this.history = this.context.router.history;
    }

    componentDidMount = () => {
        let { setSearch } = this.props.searchActions;

        setSearch([], false)
    }

    searchFunc = (url) => {

        let { setSearchingStatus, saveSearchedData, setSearch } = this.props.searchActions;

        setSearchingStatus(true);

        axios.get(url).then((response) => {

            console.log(response)
            setSearch(response.data.results, false)
        }).catch((error) => {
            console.log(error)

            setSearch([], false)
        })

    }

    handleSearchChange = (e) => {

        let { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            currentQueryString = this.state.currentQueryString,
            url = `${requestTemplate}search/movie?api_key=${apiKey}&language=ru&page=1&include_adult=true&query=${currentQueryString}`;

        /* При изменении инпута запускаем поиск и выставляем статус поиска true */
        this.searchFunc(url);

        this.setState({ currentQueryString: e.target.value })
    }

    handleSearchClick = () => {

        /* При нажатии поиска редирект на страницу показа фильмов */
        let { routeToShowSearchResult } = this.props.searchActions;

        routeToShowSearchResult(this.history);
    }

    handleFocus = () => {

        this.setState({ isSearchFocused: true })

    }

    handleBlur = () => {

        setTimeout(() => {
            this.setState({ isSearchFocused: false })
        }, 300)

    }

    render() {

        console.log("SEARCH отрендерился -----------------------------")

        let { searchDataMass, searchingStatus } = this.props.search,
            isSearchFocused = this.state.isSearchFocused,
            searchDataMassLength = searchDataMass.length,
            elementsToShow = this.state.elementsToShow,
            currentQueryString = this.state.currentQueryString,
            disabledSearchButton = this.state.disabledSearchButton,
            middleResultsTemplate = [];

        if ( currentQueryString.length > 0 ) {
            disabledSearchButton = false
        }

        console.log(searchDataMass)
        console.log(searchingStatus)
        console.log(searchDataMassLength)

        middleResultsTemplate = searchDataMass.map((currentItem, index) => {

            /* Если кол-во разрешенных для отображения элементов больше чем индекс то сформировать шаблон */
            if ( index < elementsToShow ) {
                return (<MovieListPresentationItem id={currentItem.id} title={currentItem.title} vote={currentItem.vote_average}/>)
            } else {
                return false;
            }

        })

        return (
            <div className="msearch__search">
                <input type="text" className="msearch__search-input" placeholder={"Поиск"} value={this.state.currentQueryString} onChange={this.handleSearchChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>

                <button disabled={disabledSearchButton} className={`msearch__search-button ${disabledSearchButton ? ("msearch__search-button--disabled") : ("msearch__search-button")}`} onClick={this.handleSearchClick}></button>

                { (isSearchFocused && searchDataMassLength > 0) ? (<div className="msearch__search-middle-results">
                    {middleResultsTemplate}
                </div>) : ("") }
            </div>
        )
    }

}

function mapStateToProps(state) {

    return {
        authenticateLink: state.authenticateLink,
        movieDBAuthentification: state.movieDBAuthentification,
        popularMovies: state.popularMovies,
        search: state.search
    }

}

function mapDispatchToProps(dispatch) {

    return {
        fetchingDataActions: bindActionCreators(FetchingDataActions, dispatch),
        searchActions: bindActionCreators(SearchActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)