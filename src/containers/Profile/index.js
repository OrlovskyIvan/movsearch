import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import arraySort from "array-sort";
import Loading from "../../components/Loading";
import MovieListPresentationItem from "../../components/MovieListPresentationItem";
import MovieListPresentation from "../MovieListPresentation";
import * as FetchingDataActions from "../../actions/FetchingDataActions";
import * as ProfileActions from "../../actions/ProfileActions";
import './style/style.sass'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            urlMassToRequest: [

            ],
            curUrlNumberToRequest: 0,
            isFavouriteOpened: false,
            isRatedOpened: false,
            sortedByRateReverseOrder: true,
            sortedByRatingReverseOrder: true
        }
    }

    componentDidMount = () => {

        let { iD } = this.props.authenticateLink,
            { fetchDataRequest } = this.props.fetchingDataActions,
            { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            tokenAndSessionObj = JSON.parse(localStorage.getItem('tokenAndSession')),
            /* Запрос аккаунта */
            startUrl = `${requestTemplate}account?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}`,
            /* Запрос созданных листов */
            listsUrl = `${requestTemplate}account/${iD}/lists?api_key=${apiKey}&session_id=${tokenAndSessionObj.sessionId}&language=ru&page=1`,
            /* Запрос любимых фильмов */
            favouriteUrl = `${requestTemplate}account/${iD}/favorite/movies?api_key=${apiKey}&language=ru&session_id=${tokenAndSessionObj.sessionId}&sort_by=created_at.asc&page=1`,
            /* Запрос оцененных фильмов */
            ratedUrl = `${requestTemplate}account/${iD}/rated/movies?api_key=${apiKey}&language=ru&session_id=${tokenAndSessionObj.sessionId}&sort_by=created_at.asc&page=1`,
            // `${requestTemplate}account/${iD}/rated/movies?api_key=${apiKey}&language=ru&session_id=${tokenAndSessionObj.sessionId}&sort_by=created_at.asc&page=1`
            newUrlMassToRequest = [];
            newUrlMassToRequest[0] = startUrl;
            newUrlMassToRequest[1] = listsUrl;
            newUrlMassToRequest[2] = favouriteUrl;
            newUrlMassToRequest[3] = ratedUrl;

            fetchDataRequest(newUrlMassToRequest[0]);
            this.setState({urlMassToRequest: newUrlMassToRequest});

    }

    componentDidUpdate = (prevProps) => {

        let { fetchingComplete } = this.props.profile,
            { saveProfileData, fetchingProfileDataComplete } = this.props.profileActions,
            { fetchDataRequest } = this.props.fetchingDataActions,
            { fetchedData, fetchingDataStatus } = this.props.fetchData,
            urlMass = this.state.urlMassToRequest,
            curUrlNumberToRequest = this.state.curUrlNumberToRequest,
            urlMassLength = this.state.urlMassToRequest.length;


        if ( !fetchingComplete && fetchedData !== null && !fetchingDataStatus) {
        // if ( !fetchingComplete && (fetchedData !== null && !isObjectEmpty(fetchedData)) && !fetchingDataStatus) {

            let objToSave = {
                number: curUrlNumberToRequest,
                dataObj: fetchedData
            }
            saveProfileData(objToSave)
            curUrlNumberToRequest++

            this.setState({ curUrlNumberToRequest: curUrlNumberToRequest });

            fetchDataRequest(urlMass[curUrlNumberToRequest]);

            if ( curUrlNumberToRequest === urlMassLength ) {
                fetchingProfileDataComplete(true);
            }

        }
    }

    handleSortFav = (e) => {

        /* Сортировка массива оцененных фильмов */
        /* Сохраняем массив объекта профайл */
        let { profileDataMass } = this.props.profile,
            { saveProfileData } = this.props.profileActions,
            /* Сортировка либо от меньшего к большему, либо наоборот */
            sortedByRateReverseOrder = this.state.sortedByRateReverseOrder,
            sortedByRatingReverseOrder = this.state.sortedByRatingReverseOrder,
            targetClassName = e.target.className,
            /* Копируем массив оценненых фильмов */
            ratedMoviesObj = profileDataMass[3],
            /* Копируем массив объекта профайл */
            newProfileDataMass = profileDataMass;

            /* В зависимости от нажатой кнопки сортировки выбриаем последовательность */
            switch (targetClassName) {
                case "profile__lists-rating-sort-by-myrate":

                    /* Сортируем массив и сохраняем в объект */
                    ratedMoviesObj.results = arraySort( ratedMoviesObj.results, 'rating', { reverse: !sortedByRateReverseOrder } )
                    /* Сохраняем объект в новый массив объектов */
                    newProfileDataMass[3] = ratedMoviesObj
                    saveProfileData(newProfileDataMass);
                    /* Меняем стейт сортировки */
                    this.setState({ sortedByRateReverseOrder: !sortedByRateReverseOrder });
                    break;

                case "profile__lists-rating-sort-by-rating":

                    /* Сортируем массив и сохраняем в объект */
                    ratedMoviesObj.results = arraySort( ratedMoviesObj.results, 'vote_average', { reverse: !sortedByRatingReverseOrder } )
                    /* Сохраняем объект в новый массив объектов */
                    newProfileDataMass[3] = ratedMoviesObj
                    saveProfileData(newProfileDataMass);
                    /* Меняем стейт сортировки */
                    this.setState({ sortedByRatingReverseOrder: !sortedByRatingReverseOrder });
                    break;
                default:
                    break;
            }


    }

    render () {

        let { fetchingComplete, profileDataMass } = this.props.profile,
            profileObj = {},
            listsObj = {},
            favouriteObj = {},
            ratedObj = {},
            /* Шаблон с листами */
            listsTemplate = [],
            /* Шаблон с любимыми фильмами */
            favouriteTemplate = [];

        if (fetchingComplete) {
            /* Объект с данными профайла */
            profileObj = profileDataMass[0]
            /* Объект с данными листов */
            listsObj = profileDataMass[1]
            /* Объект с данными любимых фильмов */
            favouriteObj = profileDataMass[2]
            /* Объект с оцененными фильмами */
            ratedObj = profileDataMass[3]

            /* Формирование шаблона с листами */
            listsTemplate = listsObj.results.map((currentItem) => {
                return (<MovieListPresentation key={currentItem.id} listId={currentItem.id} name={currentItem.name} itemCount={currentItem.item_count}/>)
            })

            /* Формирование шаблона с любимыми фильмами */
            favouriteTemplate = favouriteObj.results.map((currentItem) => {
                return (<MovieListPresentationItem key={currentItem.id} id={currentItem.id} title={currentItem.title} vote={currentItem.vote_average}/>)
            })

            /* Формирование шаблона с оцененными фильмами */
            ratedObj = ratedObj.results.map((currentItem) => {
                return (<MovieListPresentationItem key={currentItem.id} id={currentItem.id} title={currentItem.title} vote={currentItem.vote_average} rating={currentItem.rating}/>)
            })
        }

        return (
            <div className="msearch__profile profile">
                {!fetchingComplete ? (
                    <Loading/>
                ) : (
                    <div className="profile__main">
                        <h3 className="profile__title">Мой аккаунт</h3>

                        <div className="profile__name">{ profileObj.username }</div>

                        <div className="profile__lists">
                            <h3 className="profile__lists-title">Подборки: </h3>

                            <div className="profile__lists-container">
                                { listsTemplate }
                            </div>
                        </div>

                        <div className="profile__lists">
                            <h3 className="profile__lists-title">Любимые фильмы: </h3>

                            <div className="profile__lists-container profile__lists-fav" onClick={this.handleFavClick}>
                                <div className="profile__lists-fav-inner">
                                    { favouriteTemplate }
                                </div>
                            </div>
                        </div>

                        <div className="profile__lists">
                            <h3 className="profile__lists-title">Оцененные фильмы: </h3>

                            <div className="profile__lists-rating-sort">
                                <div className="profile__lists-rating-sort-by-myrate" onClick={this.handleSortFav}>Сортировать по оценке </div>
                                <div className="profile__lists-rating-sort-by-rating" onClick={this.handleSortFav}>Сортировать по рейтингу </div>
                            </div>
                            <div className="profile__lists-container profile__lists-fav" >
                                <div className="profile__lists-fav-inner">
                                    { ratedObj }
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        )
    }
}
// apiKey: '32e420ab16653556d7c0930d76c7a59a',
//     requestTemplate: 'https://api.themoviedb.org/3/',
function mapStateToProps(state) {

    return {
        authenticateLink: state.authenticateLink,
        fetchData: state.fetchData,
        movieDBAuthentification: state.movieDBAuthentification,
        profile: state.profile
    }

}

function mapDispatchToProps(dispatch) {

    return {
        fetchingDataActions: bindActionCreators(FetchingDataActions, dispatch),
        profileActions: bindActionCreators(ProfileActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)