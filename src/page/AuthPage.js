import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Auth from '../component/auth/SignIn.js'

export default class AuthPage extends Component {
    render() {
        return (
            <Fragment>
                <Container fluid={true} className="p-0">
                    <Auth/>
                </Container>
            </Fragment>
        )
    }
}
