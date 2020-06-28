import React, { Component, Fragment } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class SignIn extends Component {
    render() {
        return (
            <Fragment>
                <Container fluid={true} className="banner-auth p-0">
                    <Form className="login-form">
                        <Form.Group>
                            <Form.Control id="user-name" type="text" placeholder="User Name" className="text-center"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control id="password" type="password" placeholder="Password" className="text-center"></Form.Control>
                        </Form.Group>
                        <Button>Sign In</Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}
