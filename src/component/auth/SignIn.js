import React, { Component, Fragment } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class SignIn extends Component {
    constructor(){
        super();
        this.state={
            login:false
        }
    }
    signIn(){
        this.setState({login:true})
    }

    validate = () => {
        if (this.state.login === true)
            return <Redirect to='/' />
    }

    render() {
        return (
            <Fragment>
                {this.validate()}
                <Container fluid={true} className="banner-auth p-0">
                    <Form className="login-form">
                        <Form.Group>
                            <Form.Control id="user-name" type="text" placeholder="User Name" className="text-center"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control id="password" type="password" placeholder="Password" className="text-center"></Form.Control>
                        </Form.Group>
                        <Button onClick={()=> this.signIn()}>Sign In</Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}
