import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Auth from '../component/auth/SignIn.js'

export default class AuthPage extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Auth/>
                </Container>
            </Fragment>
        )
    }
}
