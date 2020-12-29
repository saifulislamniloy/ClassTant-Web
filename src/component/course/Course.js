import React, { Component, Fragment } from 'react';
import { Button, Container, Row, Col, Form, Card, Tabs, Tab } from "react-bootstrap";
import firebase from "firebase";
import SingleCourse from "./SingleCourse";

class Course extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            courseView: "",
            email: "",
            uid: "",
            name: "",
            photoUrl: "",
            courseIds: []
        }
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"));
        if (user !== null) {
            this.setState({ email: user.email, uid: user.uid, name: user.name, photoUrl: user.photoUrl })
        }

        this.getCourseList();
    }

    getCourseList() {
        this.setState({ courseView: "", loading: true })
        const db = firebase.database();
        db.ref("Users/" + this.state.uid + "/courseList").once("value")
            .then(snapshot => {

                const courses = snapshot.val();
                const courseId = []
                for (var key in courses) {
                    courseId.push(key)
                }
                this.setState({ courseIds: courseId })

                const view = courseId.map(courseId => {
                    return (
                        <SingleCourse
                            courseName={courses[courseId]["courseName"]}
                            courseCode={courses[courseId]["courseCode"]}
                            department={courses[courseId]["department"]}
                            courseSecret={courses[courseId]["courseID"]}
                        />
                    )
                })
                this.setState({ courseView: view, loading: false })
            })
    }

    addCourse() {
        const courseKey = firebase.database().ref("Courses/").push().key
        let courseName = document.getElementById("title").value;
        let courseCode = document.getElementById("code").value;
        let courseID = courseKey;
        let department = document.getElementById("dept").value;
        let enrollMode = true;
        let teacherEmail = this.state.email;
        let teacherID = this.state.uid;
        let teacherName = this.state.name;
        let teacherUrl = this.state.photoUrl;

        let JsonObject = {
            courseName,
            courseCode,
            courseID,
            department,
            enrollMode,
            teacherEmail,
            teacherID,
            teacherName,
            teacherUrl
        }

        let validationResult = this.validation(courseKey, courseName, courseCode, department, teacherID);

        if (validationResult) {
            firebase.database().ref("Courses").child(courseKey).child("courseInfo").update(JsonObject);
            firebase.database().ref("Users").child(teacherID).child("courseList").child(courseKey).update(JsonObject).then(onerror => {
                if (onerror)
                    alert("Course Creation Failed!")
                else
                    alert("Course Created Successfully")
            });
        }
    }

    joinCourse() {
        let secret = document.getElementById("secret").value;
        if (!this.hasCoursesLoaded()) {
            alert("Wait till the courses load.")
            return
        }
        if(this.hasArleadyJoined(secret)){
            alert("Already enrolled.")
            return
        }
        if (secret !== "" && secret !== null && secret !== undefined) {
            firebase.database().ref("Courses").child(secret).child("courseInfo").once("value")
                .then(snapshot => {
                    if (snapshot.exists()) {
                        let courseInfo = snapshot.val();
                        if (courseInfo != null) {
                            firebase.database().ref("Users").child(this.state.uid).child("courseList").child(secret).update(courseInfo);
                            firebase.database().ref("Courses").child(secret).child("studentList").child(this.state.uid)
                                .update({email:this.state.email, name:this.state.name, photoUrl:this.state.photoUrl, uid:this.state.uid})
                                .then(onerror => {
                                    if(onerror)console.log(onerror)
                                    else {alert("Enrolled Successfully :)"); this.getCourseList()}});
                        }
                    } else alert("Invalid Course!")
                })
        } else alert("Please enter course secret!")
    }

    hasArleadyJoined(code) {
        if (this.state.courseIds.includes(code))
            return true;
        else return false;
    }

    hasCoursesLoaded() {
        if (this.state.courseIds.length === 0)
            return false;
        else return true;
    }

    validation(courseKey, courseName, courseCode, department, teacherID) {
        let result = true;
        if (courseKey == null)
            result = false
        if (courseName.length < 1) {
            alert("Course name can not be empty!")
            result = false
        }
        if (courseCode.length < 1) {
            alert("Course code can not be empty!")
            result = false
        }
        if (department.length < 1) {
            alert("Department name can not be Empty")
            result = false
        }
        if (teacherID == null) {
            alert("Session timed out! Login again")
            result = false
        }
        return result;
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <Tabs defaultActiveKey="join" id="uncontrolled-tab-example">
                                <Tab eventKey="join" title="Join">
                                    <Card className="topCardDesign">
                                        <Card.Header>
                                            <h1 className="moto">Enroll to a Course</h1>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control id="secret" type="text" placeholder="Course Secret" />
                                                </Form.Group>
                                            </Form>
                                            <Button onClick={() => this.joinCourse()}>Join</Button>
                                        </Card.Body>
                                    </Card>
                                </Tab>
                                <Tab eventKey="create" title="Create">
                                    <Card className="topCardDesign">
                                        <Card.Header>
                                            <h1 className="moto">Add New Course</h1>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control id="title" type="text" placeholder="Course Name" />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control id="code" type="text" placeholder="Course Code" />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control id="dept" type="text" placeholder="Department" />
                                                </Form.Group>
                                            </Form>
                                            <Button onClick={() => this.addCourse()}>Create</Button>
                                        </Card.Body>
                                    </Card>
                                </Tab>
                            </Tabs>
                        </Col>
                        <br />
                        <Col lg={12} md={12} sm={12}>
                            {this.state.courseView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Course;