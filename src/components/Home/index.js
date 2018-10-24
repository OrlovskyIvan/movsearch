import React, { Component } from 'react'
import { withRouter, Prompt } from "react-router-dom";
// import { Prompt } from "react-router-dom";
import PropTypes from 'prop-types';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOut: true
        }

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const value = e.target.elements[0].value.toLowerCase()
        this.context.router.history.push(`/genre/${value}`)
    }

    render() {

        let isOut = this.state.isOut;

        return (

            <div className='row'>
                {/*<Prompt when={isOut} message='Are you sure you want to go out' />*/}
                <div className='col-md-12'>Раздел /</div>
                <form className='col-md-4' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='genreName'/>
                    <button type='submit'>Перейти</button>
                </form>
            </div>
        )
    }
}

Home.contextTypes = {
    router: PropTypes.object.isRequired
}

export default withRouter(Home);