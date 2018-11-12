import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Manager, Reference, Popper } from 'react-popper';
import Transition from 'react-transition-group/Transition'
import "./style/style.sass"

const defaultStyle = {
    transition: `opacity 1000ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
};

export default class AddMovieToList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPopperOpened: false,
            duration: 1000
        }

    }

    handleAddButtonClick = () => {

        this.setState({
            isPopperOpened: !this.state.isPopperOpened
        })



    }

    render() {

        let isPopperOpened = this.state.isPopperOpened,
            duration = this.state.duration;

        console.log("handleAddButtonClick")
        console.log(isPopperOpened)
        return(

            <div className="msearch__movie-add-container">
                <div className="msearch__movie-add" onClick={this.handleAddButtonClick}></div>

                <Transition in={isPopperOpened} timeout={duration}>
                    {(state) => (
                    <div className="msearch__movie-add-popper" style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        Список листов {state.isPopperOpened}
                        </div>
                    )}
                </Transition>

            </div>

        )
    }

}