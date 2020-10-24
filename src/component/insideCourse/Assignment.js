import React, { Component, Fragment } from 'react'
import {Container, Row, Col, Form, Card, Button, Image} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import firebase from "firebase";
import editIcon from "../../asset/icon/edit.svg";
import deleteIcon from "../../asset/icon/delete.svg";
import {auth} from "../../firebase";

export default class Assignment extends Component {
    constructor() {
        super();
        this.state = {
            loading:true,
            assignmentView: ""
        }
    }

    componentDidMount() {
        this.getAssignmentList();
    }

    getAssignmentList(){
        const db = firebase.database();
        db.ref("Courses/"+this.props.courseId+"/assignments").once("value" )
            .then(snapshot =>{

                const assignments = snapshot.val();
                console.log(assignments)
                const assignmentId = []
                for (var key in assignments){
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
                                        <Image src={editIcon} height="40" width="40"/>
                                    </Col>
                                    <Col sm={1} md={1} lg={1}>
                                        <Image src={deleteIcon} height="40" width="40"/>
                                    </Col>

                                </Row>
                            </Card.Header>
                            <Card.Body className="a_description">{assignments[assignmentId]["assignmentDescription"]}</Card.Body>
                        </Card>
                    )
                })
                this.setState({assignmentView:view, loading:false})
            })
    }

    postAssignment(){
        const db = firebase.database();
        const time = new Date().getTime();
        if (this.validation()) {
            db.ref("Courses/" + this.props.courseId + "/assignments/" + time)
                .update(
                    {
                        "assignmentDescription": document.getElementById("des").value,
                        "assignmentId": time,
                        "assignmentName": document.getElementById("header").value,
                        "creationTime": time,
                        "authorId": auth.currentUser.uid,
                        "deadline": "Thu Oct 01 14:47:20 GMT+06:00 2020",
                        "postedBy": auth.currentUser.displayName,
                        "link": document.getElementById("link").value,
                    },
                    function (error) {
                        if (error)
                            alert("failed")
                        else
                            alert("success")
                    })
        }
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <Card className="topCardDesign">
                                <Card.Title style={{textAlign:"center", fontWeight:600, fontSize:32}}>Assignment Section</Card.Title>
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
                                <Datetime
                                    locale="bn"
                                    dateFormat="DD-MM-YYYY"
                                />
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
