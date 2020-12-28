import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Card, Button, Image } from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import firebase from "firebase";
import SingleAssignment from "./SingleAssignment";
import { CourseContext } from '../../providers/CourseProvider'

export default class Assignment extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            assignmentView: "",
            uid: "",
            name: "",
            deadline: ""
        }
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"))
        if (user !== null) {
            this.setState({ uid: user.uid, name: user.name })
        }
        this.getAssignmentList();
    }

    getAssignmentList() {
        const db = firebase.database();
        db.ref("Courses/" + this.props.courseId + "/assignments").once("value")
            .then(snapshot => {

                const assignments = snapshot.val();
                console.log(assignments)
                const assignmentId = []
                for (var key in assignments) {
                    assignmentId.push(key)
                }

                const view = assignmentId.slice(0).reverse().map(assignmentId => {
                    return (
                        <SingleAssignment
                            id={assignments[assignmentId]["assignmentId"]}
                            courseId={this.props.courseId}
                            authorId={this.state.uid}
                            title={assignments[assignmentId]["assignmentName"]}
                            description={assignments[assignmentId]["assignmentDescription"]}
                            link={assignments[assignmentId]["url"]}
                            postedBy={assignments[assignmentId]["postedBy"]}
                            postTime={assignments[assignmentId]["creationTime"]}
                            deadline={assignments[assignmentId]["deadline"]}
                        />
                    )
                })
                this.setState({ assignmentView: view, loading: false })
            })
    }

    postAssignment() {
        const db = firebase.database();
        const deadlineTime = new Date(this.state.deadline).getTime().toString();

        let assignmentDescription = document.getElementById("des").value
        let assignmentId = deadlineTime
        let assignmentName = document.getElementById("header").value
        let authorId = this.state.uid
        let creationTime = new Date().getTime().toString()
        let deadline = this.state.deadline + ""
        let postedBy = this.state.name
        let url = document.getElementById("link").value

        let jsonObject = { assignmentDescription, assignmentId, assignmentName, authorId, creationTime, deadline, postedBy, url }
        let validationResult = this.validation(assignmentName, authorId, postedBy, deadline)
        if (validationResult) {
            db.ref("Courses/" + this.props.courseId + "/assignments/" + deadlineTime)
                .update(
                    jsonObject,
                    function (error) {
                        if (error)
                            alert("failed")
                        else
                            alert("Success")
                    })
        }
    }

    validation(assignmentName, authorId, postedBy, deadline) {
        let result = true;
        if (assignmentName.length < 1) {
            alert("Header can not be empty!")
            result = false
        }
        if (authorId == null) {
            alert("Something went wrong! Pleas sign in again.")
            result = false
        }
        if (postedBy == null) {
            result = false
            alert("Something went wrong! Pleas sign in again.")
        }
        if (deadline.length < 12) {
            alert("Please Set Deadline.")
            result = false
        }
        return result
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <CourseContext.Consumer>
                            {(course) => (
                                <Col lg={12} md={12} sm={12}>
                                    {course.currentCourse.teacherId === this.state.uid ?
                                        <Card className="topCardDesign">
                                            <Card.Title style={{ textAlign: "center", fontWeight: 600, fontSize: 32 }}>Assignment
                                    Section</Card.Title>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control id="header" type="text" placeholder="Header" />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control id="des" as="textarea" row={3} placeholder="Description" />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control id="link" type="text" placeholder="Link (Optional)" />
                                                </Form.Group>
                                            </Form>
                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <Form.Label>Deadline</Form.Label>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <Datetime
                                                        dateFormat="MMMM DD, YYYY"
                                                        id="date"
                                                        onChange={(date) => this.setState({ deadline: date._d })}
                                                    />
                                                </Col>
                                            </Row>
                                            <br />
                                            <Button onClick={() => this.postAssignment()} variant="primary">
                                                Post
                                            </Button>
                                        </Card>
                                        :
                                        <span></span>}
                                </Col>
                            )}
                        </CourseContext.Consumer>
                        <Col lg={12} md={12} sm={12}>
                            {this.state.assignmentView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
