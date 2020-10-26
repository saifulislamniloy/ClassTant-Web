import React, {Component, Fragment} from 'react'
import {Container, Row, Col, Form, Card, Button, Image} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import firebase from "firebase";

export default class Assignment extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            assignmentView: "",
            uid: "",
            name: "",
            deadline:""
        }
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"))
        if (user !== null) {
            this.setState({uid: user.uid, name: user.name})
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

                const view = assignmentId.map(assignmentId => {
                    return (
                        <Card className="topCardDesign">
                            <Card.Header>
                                <Row>
                                    <Col sm={10} md={10} lg={10} className="a_title">
                                        {assignments[assignmentId]["assignmentName"]}
                                    </Col>
                                    <Col sm={1} md={1} lg={1}>
                                        <Button>Edit</Button>
                                    </Col>
                                    <Col sm={1} md={1} lg={1}>
                                        <Button>Delete</Button>
                                    </Col>

                                </Row>
                            </Card.Header>
                            <Card.Body className="a_description">
                                {assignments[assignmentId]["assignmentDescription"]}
                            </Card.Body>
                            <Card.Footer>
                                {assignments[assignmentId]["url"]}
                            </Card.Footer>
                        </Card>
                    )
                })
                this.setState({assignmentView: view, loading: false})
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

        let jsonObject = {assignmentDescription,assignmentId,assignmentName,authorId,creationTime,deadline,postedBy,url}
        let validationResult = this.validation(assignmentName,authorId,postedBy, deadline)
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

    validation(assignmentName,authorId,postedBy, deadline) {
        let result = true;
        if(assignmentName.length <1){
            alert("Header can not be empty!")
            result = false
        }
        if(authorId == null){
            alert("Something went wrong! Pleas sign in again.")
            result = false
        }
        if(postedBy == null){
            result = false
            alert("Something went wrong! Pleas sign in again.")
        }
        if(deadline.length <12){
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
                        <Col lg={12} md={12} sm={12}>
                            <Card className="topCardDesign">
                                <Card.Title style={{textAlign: "center", fontWeight: 600, fontSize: 32}}>Assignment
                                    Section</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Control id="header" type="text" placeholder="Header"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control id="des" type="text" placeholder="Description"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control id="link" type="text" placeholder="Link (Optional)"/>
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
                                            onChange={(date)=>this.setState({deadline:date._d})}
                                        />
                                    </Col>
                                </Row>
                                <br/>
                                <Button onClick={() => this.postAssignment()} variant="primary">
                                    Post
                                </Button>
                            </Card>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            {this.state.assignmentView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
