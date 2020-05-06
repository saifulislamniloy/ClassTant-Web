import React, {Component, Fragment} from 'react';
import {Button, Container, Form} from "react-bootstrap";

class CreateCourse extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Form>
                        <Form.Group>
                            <Form.Label>Course Title</Form.Label>
                            <Form.Control id="title" type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control id="code" type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Programme</Form.Label>
                            <Form.Control id="prog" type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Credit Hour</Form.Label>
                            <Form.Control id="credit" type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Guest Teacher</Form.Label>
                            <Form.Control id="guest" type="password"/>
                        </Form.Group>
                        <Button onClick={() => this.login()} variant="primary">
                            Create Course
                        </Button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}

export default CreateCourse;