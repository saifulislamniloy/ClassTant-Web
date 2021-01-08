import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { removeUrlError } from '../../functions/Utility';
import { CourseContext } from '../../providers/CourseProvider';
import EmptySpace from '../common/EmptySpace';

export default class ClassLink extends Component {
    constructor() {
        super();
        this.state = { uid: "" }
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"))
        if (user !== null) {
            this.setState({ uid: user.uid })
        }
    }
    render() {
        return (
            <CourseContext.Consumer>
                {(course) => (
                    <span>
                        {course.isCourseSelected + course.classLinkEditMode === 1 ?
                            <Card.Body>
                                {course.currentCourse.teacherId === this.state.uid ?
                                    <Row>
                                        <Col sm={10} md={10} lg={10}>
                                            <Card.Title className="classLink mt-2">
                                                Class Link: {course.classLink === undefined ? "No link given. Click edit to  provide link." : <a href={removeUrlError(course.classLink)} target="#">{course.classLink}</a>}
                                            </Card.Title>
                                        </Col>
                                        <Col sm={2} md={2} lg={2}>
                                            <Button onClick={() => course.setClassLinkEditMode(true)}>
                                                Edit
                                    </Button>
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Card.Title className="classLink">
                                                Class Link: {course.classLink === undefined ? "No link given." : <a href={removeUrlError(course.classLink)} target="#">{course.classLink}</a>}
                                            </Card.Title>
                                        </Col>
                                    </Row>}
                            </Card.Body>
                            :
                            <EmptySpace />
                        }
                    </span>
                )}
            </CourseContext.Consumer>
        )
    }
}
