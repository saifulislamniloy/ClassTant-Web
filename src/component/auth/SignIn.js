import React, { Component, Fragment } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class SignIn extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Form>
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Button>Sign In</Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}
