import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Dropdown, Row} from "react-bootstrap";

class SingleClassSchedule extends Component {
    render() {
        return (
            <Fragment>
                <Container className="class-schedule-card">
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Card className="over-all m-1">
                                <Card.Header>
                                    <Row>
                                        <Col lg={10} md={10} sm={10}>
                                            <p>{this.props.classTime}</p>
                                        </Col>
                                        <Col lg={2} md={2} sm={2}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary">
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item disabled>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item disabled>
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <p>{this.props.description}</p>
                                </Card.Body>
                                <Card.Footer>
                                    <p>{"~" + this.props.postedBy}</p>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default SingleClassSchedule;