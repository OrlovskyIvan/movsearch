import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import MoviePresentation from "../../components/MoviePresentation";
import Masonry from 'react-masonry-component';
import * as SearchActions from "../../actions/SearchActions";
import * as FetchingDataActions from "../../actions/FetchingDataActions";
import './style/style.sass'

class ShowSearchResult extends Component {

    render() {

        let { searchDataMass } = this.props.search,
            showSearchResultTemplate = [],
            { basePosterUrl } = this.props.popularMovies,
            masonryOptions = {
                transitionDuration: 1000,
                stagger: 30,
                gutter: 10
            };

        showSearchResultTemplate = searchDataMass.map((currentValue, index) => {

            const movieDataObj = {};

            movieDataObj.id = currentValue.id
            movieDataObj.title = currentValue.original_title
            movieDataObj.posterUrl = `${basePosterUrl}${currentValue.poster_path}`
            movieDataObj.genres_id = currentValue.genre_ids
            movieDataObj.caption = currentValue.overview
            movieDataObj.rating = currentValue.vote_average

            return (<MoviePresentation key={index} movieDataObj={movieDataObj}/>)
        })


        return (
            <div className="msearch__show-search-result">
                <h2 className="msearch__show-search-result-title">Найденные фильмы: </h2>

                    <Masonry
                        className={'msearch__show-search-result-movies'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        imagesLoadedOptions={false} // default {}
                    >
                        {showSearchResultTemplate}
                    </Masonry>

            </div>
        )
    }
}


function mapStateToProps(state) {

    return {
        search: state.search,
        popularMovies: state.popularMovies
    }

}


function mapDispatchToProps(dispatch) {

    return {
        fetchingDataActions: bindActionCreators(FetchingDataActions, dispatch),
        searchActions: bindActionCreators(SearchActions, dispatch)
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(ShowSearchResult)

// <div className="msearch__show-search-result">
//     <h2 className="msearch__show-search-result-title">Найденные фильмы: </h2>
//
// {fetchingDataStatus ?
//     (<Loading/>) :
//     (<Masonry
//         className={'msearch__popular-movies'} // default ''
//         elementType={'ul'} // default 'div'
//         options={masonryOptions} // default {}
//         disableImagesLoaded={false} // default false
//         updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
//         imagesLoadedOptions={false} // default {}
//     >
//         {popularMoviesTemplate}
//     </Masonry>)
// }
//
// </div>