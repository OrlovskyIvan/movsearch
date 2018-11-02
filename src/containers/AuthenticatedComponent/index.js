import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ROUTING } from "../../constants/Routing"
import PropTypes from 'prop-types'

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        static contextTypes = {
            router: PropTypes.object
        }

        constructor(props, context) {
            super(props, context);

            this.history = this.context.router.history;
        }

        componentWillMount() {
            this.checkAuth(this.props.authenticateLink);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.authenticateLink);
        }

        checkAuth(authenticateLink) {

            let self = this;

            if (!authenticateLink.iD) {
                this.props.dispatch({
                    type: ROUTING,
                    payload: {
                        // method: 'replace',
                        nextUrl: '/login',
                        history: self.history,
                        method: 'replace'
                    }
                })
            }
        }


        render() {
            return (
                <div>
                    {this.props.authenticateLink.iD
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            authenticateLink: state.authenticateLink
        }
    }

    return connect(mapStateToProps)(AuthenticatedComponent)
}