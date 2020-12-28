import React, { Component } from 'react'
import firebase from "firebase";
import { CourseContext } from '../../providers/CourseProvider'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import EmptySpace from '../common/EmptySpace';

export default class ClassLinkEditMode extends Component {
    constructor() {
        super();
        this.state = {
            uid: "",
            classLink: ""
        };
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"))
        if (user !== null) {
            this.setState({ uid: user.uid })
        }
    }

    getClassLink(courseId) {
        const db = firebase.database();
        return db.ref("Users/" + this.state.uid + "/courseList/" + courseId).once("value");
    }


    postClassLink(courseId) {
        const db = firebase.database();
        if (courseId !== "")
            db.ref("Users/" + this.state.uid + "/courseList/" + courseId)
                .update({ "classLink": document.getElementById("classLink").value },
                    function (error) {
                        if (error)
                            alert("failed")
                    })
    }

    render() {
        return (
            <CourseContext.Consumer>
                {(course) => (
                    <span>
                        {course.isCourseSelected * course.classLinkEditMode === 1 ?
                            <Card.Body>
                                <Row>
                                    <Col sm={8} md={8} lg={8}>
                                        <Form>
                                            <Form.Group>
                                                <Form.Control id="classLink"
                                                    type="text"
                                                    placeholder="Enter Class Link (Complete URL)"
                                                    value={course.classLink !== undefined ? course.classLink : ""}
                                                    onChange={(text) => course.setClassLink(text.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col sm={2} md={2} lg={2}>
                                        <Button onClick={() => {
                                            this.postClassLink(course.currentCourse.selectedCourseId);
                                            this.getClassLink(course.currentCourse.selectedCourseId)
                                                .then(snapshot => {
                                                    let link = snapshot.val().classLink
                                                    if (link !== undefined)
                                                        course.setClassLink(link)
                                                })
                                            course.setClassLinkEditMode(false);
                                        }}>
                                            Save
                                    </Button>
                                    </Col>
                                    <Col sm={2} md={2} lg={2}>
                                        <Button onClick={() => {
                                            this.getClassLink(course.currentCourse.selectedCourseId)
                                                .then(snapshot => {
                                                    let link = snapshot.val().classLink
                                                    if (link !== undefined)
                                                        course.setClassLink(link)
                                                })
                                            course.setClassLinkEditMode(false);
                                        }}>
                                            Cacnel
                                </Button>
                                    </Col>
                                </Row>
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
