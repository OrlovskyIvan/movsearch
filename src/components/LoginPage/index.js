import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'
import PropTypes from 'prop-types'

class LoginPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);

    }

    handleSubmit = (e) => {
        // e.preventDefault()
        // const value = e.target.elements[0].value
        //
        // window.localStorage.setItem('rr_login', value)
        //
        // if (value === 'admin') {
        //     this.context.router.history.push('/admin')
        // }

        /* Берем объект хистори и отправляем его в экшен логин, где усилитель должен его подхватить и сделать редирект с помощью этого объекта */

        let history = this.context.router.history;

        console.log(history);

        e.preventDefault();
        this.props.actions.login({name: e.target.elements[0].value, history: history, method: 'push'})
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <form className='form-inline' onSubmit={this.handleSubmit}>
                        <input className='form-control' type='text' placeholder='login'/>{' '}
                        <button className='btn btn-primary' type='submit'>Войти</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

// Index.contextTypes = {
//     router: PropTypes.object.isRequired
// }