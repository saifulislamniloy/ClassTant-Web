import React, {Component, Fragment} from 'react';
import {Button, Container, Row, Col, Form, Card, Image} from "react-bootstrap";
import firebase from "firebase";

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            loading:true,
            courseView: "",
            email:"",
            uid:"",
            name:"",
            photoUrl:"",
        }
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"));
        if(user !== null){
            this.setState({email:user.email, uid:user.uid, name:user.name, photoUrl:user.photoUrl})
        }

        this.getCourseList();
    }

    getCourseList() {
        const db = firebase.database();
        db.ref("Teachers/" + this.state.uid + "/courseList").once("value")
            .then(snapshot => {

                const courses = snapshot.val();
                const courseId = []
                for (var key in courses) {
                    courseId.push(key)
                }

                const view = courseId.map(courseId => {
                    return (
                        <Card className="topCardDesign">
                            <Card.Header>
                                <Row>
                                    <Col sm={10} md={10} lg={10} className="a_title">
                                        {courses[courseId]["courseName"]}
                                    </Col>
                                    <Col sm={1} md={1} lg={1}>
                                        <Button disabled={true}>Edit</Button>
                                    </Col>
                                    <Col sm={1} md={1} lg={1}>
                                        <Button disabled={true}>Delete</Button>
                                    </Col>

                                </Row>
                            </Card.Header>
                            <Card.Body>
                                {courses[courseId]["courseCode"]}
                                {courses[courseId]["department"]}
                            </Card.Body>
                        </Card>
                    )
                })
                this.setState({courseView: view, loading: false})
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

        if(validationResult){
            firebase.database().ref("Courses").child(courseKey).child("courseInfo").update(JsonObject);
            firebase.database().ref("Teachers").child(teacherID).child("courseList").child(courseKey).update(JsonObject).then(onerror=>{
                if(onerror)
                    alert("Course Creation Failed!")
                else
                    alert("Course Created Successfully")
            });
        }
    }
    validation(courseKey, courseName, courseCode, department, teacherID){
        let result = true;
        if(courseKey == null)
            result = false
        if(courseName.length < 1){
            alert("Course name can not be empty!")
            result = false
        }
        if(courseCode.length < 1){
            alert("Course code can not be empty!")
            result = false
        }
        if(department.length < 1){
            alert("Department name can not be Empty")
            result = false
        }
        if(teacherID == null){
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
                            <Card className="topCardDesign">
                                <Card.Header>
                                    <h1 className="moto">Add New Course</h1>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Control id="title" type="text" placeholder="Course Name"/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control id="code" type="text" placeholder="Course Code"/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control id="dept" type="text" placeholder="Department"/>
                                        </Form.Group>
                                    </Form>
                                    <Button onClick={()=>this.addCourse()}>ADD</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <br/>
                        <Col lg={12} md={12} sm={12}>
                            {this.state.courseView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default CreateCourse;