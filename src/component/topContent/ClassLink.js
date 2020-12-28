import React, { Component } from 'react'
import firebase from "firebase";
import { CourseContext } from '../../providers/CourseProvider'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import EmptySpace from '../common/EmptySpace';

export default class ClassLink extends Component {
    render() {
        return (
            <CourseContext.Consumer>
                {(course) => (
                    <Container>
                        {
                            course.isCourseSelected + course.classLinkEditMode === 1 ?
                                <Row>
                                    <Col sm={10} md={10} lg={10}>
                                        <Card.Title className="classLink mt-2">
                                            Class Link: <a href={course.classLink} target="#">{course.classLink}</a>
                                        </Card.Title>
                                    </Col>
                                    <Col sm={2} md={2} lg={2}>
                                        <Button onClick={() => course.setClassLinkEditMode(true)}>
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                                :
                                <EmptySpace />
                        }
                    </Container>
                )}
            </CourseContext.Consumer>
        )
    }
}
