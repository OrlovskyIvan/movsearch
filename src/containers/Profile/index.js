import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import axios from "axios/index";
import Movie from "../../components/Movie";
import Loading from "../../components/Loading";
import MovieListPresentation from "../../components/MovieListPresentation";
import * as movieDBAuthentificationActions from "../../actions/MovieDBAuthentificationActions";
import * as PopularMoviesActions from "../../actions/PopularMoviesActions";
import * as FetchingDataActions from "../../actions/FetchingDataActions";
import * as ProfileActions from "../../actions/ProfileActions";
import './style/style.sass'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            urlMassToRequest: [

            ],
            curUrlNumberToRequest: 0
        }
    }

    componentDidMount = () => {
        console.log("Компонет профайл смонтирован")
        let { iD } = this.props.authenticateLink,
            { fetchDataRequest } = this.props.fetchingDataActions,
            { apiKey, requestTemplate } = this.props.movieDBAuthentification,
            { saveProfileData } = this.props.profileActions,
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

            console.log(newUrlMassToRequest)
            console.log(iD);
            console.log("dsadas")
            console.log("Компонент профайл запрос с url")
            console.log(iD);
            console.log(newUrlMassToRequest[0])
            fetchDataRequest(newUrlMassToRequest[0]);
            console.log("Записываем в локал стейт профайла массив с урл")
            this.setState({urlMassToRequest: newUrlMassToRequest});

    }

    componentDidUpdate = (prevProps) => {
        console.log("Компонет профайл обновился")

        let { fetchingComplete } = this.props.profile,
            { saveProfileData, fetchingProfileDataComplete } = this.props.profileActions,
            { fetchDataRequest, clearFetchedData } = this.props.fetchingDataActions,
            { fetchedData, fetchingDataStatus } = this.props.fetchData,
            urlMass = this.state.urlMassToRequest,
            curUrlNumberToRequest = this.state.curUrlNumberToRequest,
            urlMassLength = this.state.urlMassToRequest.length;

        console.log(this.props.profile)
        console.log(this.props.fetchData)
        console.log("Запрос профайла активен")
        console.log(fetchingComplete)
        console.log("Данные в фетч")
        console.log(fetchedData)
        console.log("Номер под которым данные будут записаны в массив")
        console.log(curUrlNumberToRequest)

        if ( !fetchingComplete && fetchedData !== null && !fetchingDataStatus) {
        // if ( !fetchingComplete && (fetchedData !== null && !isObjectEmpty(fetchedData)) && !fetchingDataStatus) {
            console.log("Данные из fetch получены, сохраняем")

            let objToSave = {
                number: curUrlNumberToRequest,
                dataObj: fetchedData
            }
            saveProfileData(objToSave)
            curUrlNumberToRequest++

            console.log("Номер урл который будет запрашиваться")
            console.log(curUrlNumberToRequest)

            this.setState({ curUrlNumberToRequest: curUrlNumberToRequest });

            fetchDataRequest(urlMass[curUrlNumberToRequest]);

            if ( curUrlNumberToRequest === urlMassLength ) {
                fetchingProfileDataComplete(true);
            }

        }
    }
/*
* 0: Object { id: 8084845, iso_639_1: "ru", iso_3166_1: "RU", … }
1: Object {  }
2: Object { page: 1, total_pages: 1, total_results: 2, … }
3: Object { page: 1, total_pages: 0, total_results: 0, … }
* */

/*
avatar: Object { gravatar: {…} }
id: 8084845
include_adult: true
iso_3166_1: "RU"
iso_639_1: "ru"
name: ""
username: "IvanOrlov"


1: {…}
page: 1
results: (1) […]
    0: {…}
    description: ""
    favorite_count: 0
    id: 93800
    iso_639_1: "ru"
    item_count: 3
    list_type: "movie"
    name: "Test List"
    poster_path: null
​​​
total_pages: 1
total_results: 1
​​​
2: {…}
page: 1
results: (2) […]
    0: {…}
    adult: false
    backdrop_path: "/yBYmjAKALazmQ1vN6OokOv7s5nh.jpg"
    genre_ids: (4) […]
    0: 9648
    1: 878
    2: 53
    3: 10749
    length: 4
    <prototype>: Array []
    id: 782
    original_language: "en"
    original_title: "Gattaca"
    overview: "Добро пожаловать в Гаттаку — совершенный мир будущего. Здесь каждый генетически запрограммирован, и печальная судьба ожидает тех, кто был рожден в любви, а не в лаборатории. Такова судьба Винсента Фримана, молодого человека, получившего при рождении ярлык «не пригоден».Винсент обладает весомыми недостатками: он подвержен страстям, он поддается эмоциям, и он верит в то, что его мечты сбудутся. Вот почему он покупает личность другого человека, пытаясь обмануть власти и стать уважаемым членом Корпорации Будущего Гаттака.И когда он уже на пути к свободе, убийство грозит раскрытием его реальной личности. Несмотря на свою невиновность, Винсенту есть что скрывать и есть что терять. Но так трудно остаться в живых, когда в тебе живут два человека…"
    popularity: 12.142
    poster_path: "/jaiizWYdA9k4TfJFSS2IZByqc92.jpg"
    release_date: "1997-09-07"
    title: "Гаттака"
    video: false
    vote_average: 7.5
    vote_count: 2769
    <prototype>: Object { … }
    ​​​
    1: {…}
    adult: false
    backdrop_path: "/87hTDiay2N2qWyX4Ds7ybXi9h8I.jpg"
    genre_ids: (1) […]
    0: 18
    length: 1
    <prototype>: Array []
    id: 550
    original_language: "en"
    original_title: "Fight Club"
    overview: "Терзаемый хронической бессоницей и отчаянно пытающийся вырваться из мучительно скучной жизни клерк встречает некоего Тайлера Дардена, харизматического торговца мылом с извращенной философией. Тайлер уверен, что самосовершенствование — удел слабых, а саморазрушение — единственное, ради чего стоит жить."
    popularity: 31.173
    poster_path: "/hTjHSmQGiaUMyIx3Z25Q1iktCFD.jpg"
    release_date: "1999-10-15"
    title: "Бойцовский клуб"
    video: false
    vote_average: 8.4
    vote_count: 14069​
length: 2
total_pages: 1
total_results: 2
​​

3: {…}
page: 1
results: []
length: 0
<prototype>: Array []
total_pages: 0
total_results: 0
<prototype>: Object { … }
length: 4

 */
    render () {
        console.log("_________________________________________________________________________________________________________")
        console.log("Компонет профайл отрендерился")

        let { fetchingDataStatus } = this.props.fetchData,
            { fetchingComplete, profileDataMass } = this.props.profile;
        console.log(profileDataMass)
        console.log("закончено ли получение данных")
        console.log(fetchingComplete)
        if (fetchingComplete) {
            /* Объект с данными профайла */
            let profileObj = profileDataMass[0],
                /* Объект с данными листов */
                listsObj = profileDataMass[1],
                /* Объект с данными любимых фильмов */
                favouriteObj = profileDataMass[2],
                /* Объект с оцененными фильмами */
                ratedObj = profileDataMass[3],
                /* Шаблон с листами */
                listsTemplate = [];
            console.log(listsObj)
            /* Формирование шаблона с листами */
            listsTemplate = listsObj.results.map((currentItem) => {
                return (<MovieListPresentation listId={currentItem.id} name={currentItem.name}/>)
            })
        }

        console.log("Данные в массиве компонента профайл")
        console.log(profileDataMass)
        return (
            <div className="msearch__profile profile">
                {!fetchingComplete ? (
                    <Loading/>
                ) : (
                    <div className="profile__main">
                        <h3 className="profile__title">Пользователь</h3>

                        <div className="profile__name">{ profileObj.username }</div>

                        <div className="profile__lists">
                            { listsTemplate }
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