import React, { Component } from 'react'
import { Fragment } from 'react'
import { Card, Container, Row, Col, Dropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class TopCardContent extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <div style={{ margin: 20 }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Row>
                                        <Col sm={12} md={6} lg={6}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    Select Course
                                                 </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Course 1</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Course 2</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Course 3</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button style={{margin:10}}><Link to="create-course" style={{color:"white"}}>Create Course</Link></Button>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Card.Text>Course Code</Card.Text>
                                            <Card.Text>Next Class</Card.Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={12}>
                            <div style={{ margin: 20 }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Card.Title>Class Link</Card.Title>
                                </Card>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        {/* Annoucnement */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{ margin: 20 }} onClick={() => { alert("hello"); }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Card.Title >
                                        Annoucement
                                </Card.Title>
                                    <Card.Body>
                                        A declaration you want to share among the class
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        {/* DIscussion */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{ margin: 20 }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Card.Title >
                                        DIscussion
                                </Card.Title>
                                    <Card.Body>
                                        A conversion or a debate about specific topic
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        {/* Class Schedule */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{ margin: 20 }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Card.Title >
                                        Class Schedule
                                </Card.Title>
                                    <Card.Body>
                                        SChedule your whole course or edit your class time
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        {/* Assignments */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{ margin: 20 }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Card.Title >
                                        Assignments
                                </Card.Title>
                                    <Card.Body>
                                        A declaration you want to share among the class
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        {/* Marks */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{ margin: 20 }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Card.Title >
                                        Marks
                                </Card.Title>
                                    <Card.Body>
                                        Let your student know about their performance
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        {/* Appointments */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{ margin: 20 }}>
                                <Card style={{ padding: 10, textAlign: "center", color: "white", background: "blue" }}>
                                    <Card.Title >
                                        Appointments
                                </Card.Title>
                                    <Card.Body>
                                        Student may get stuck, they want to talk to  you personally.
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
