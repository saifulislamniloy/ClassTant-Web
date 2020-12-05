import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Datetime from "react-datetime";
import firebase from "firebase";

class ClassSchedule extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            classScheduleView: "",
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
    }

    postClassSchedule() {
        const db = firebase.database();
        const deadlineTime = new Date(this.state.deadline).getTime().toString();

        let authorId = this.state.uid
        let classId = deadlineTime
        let description = document.getElementById("des").value
        let placeTime = new Date().getTime().toString()
        let postedBy = this.state.name
        let deadline = this.state.deadline + ""

        let jsonObject = {authorId, classId, description, placeTime, postedBy, time:deadline}
        let validationResult = this.validation(authorId,postedBy, deadline)
        if (validationResult) {
            db.ref("Courses/" + this.props.courseId + "/classSchedules/" + deadlineTime)
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

    validation(authorId,postedBy, deadline) {
        let result = true;
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
                                <Card.Title style={{textAlign: "center", fontWeight: 600, fontSize: 32}}>Class Schedule</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Control id="des" as="textarea" row={3} placeholder="Description"/>
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
                                <Button onClick={() => this.postClassSchedule()} variant="primary">
                                    Place Class
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            {this.state.classScheduleView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default ClassSchedule;