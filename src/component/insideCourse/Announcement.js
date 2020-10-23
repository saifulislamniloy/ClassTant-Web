import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

class Announcement extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <Card className="noticeCard">
                                <Card.Title style={{textAlign:"center", fontWeight:600, fontSize:32}}>Announcement Section</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Control id="header" type="text" placeholder="Header" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control id="des" type="text" placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control id="link" type="text" placeholder="Link (Optional)" />
                                    </Form.Group>
                                </Form>
                                <Button onClick={() => this.postAssignment()} variant="primary">
                                    Post
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Announcement;