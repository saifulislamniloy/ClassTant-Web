import React, {Component} from 'react'
import {Fragment} from 'react'
import {Card, Container, Row, Col, Dropdown, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import firebase from "firebase";

export default class TopCardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCourse: "Select Course",
            isCourseSelected: false,
            selectedCourseName: "Course Name",
            selectedCourseCode: "Course Code",
            selectedCourseId: "",
            courseListView: "",

            classLink: "",
            editMode: false
        }
    }

    componentDidMount() {
        this.getCourseList()
    }

    getCourseList() {
        const db = firebase.database();
        db.ref("Teachers/" + this.props.uid + "/courseList").once("value")
            .then(snapshot => {

                const courses = snapshot.val();
                console.log(courses)
                const courseId = []
                for (var key in courses) {
                    courseId.push(key)
                    console.log(key + " " + courses[key]["courseName"])
                }

                const view = courseId.map(courseId => {
                    return (
                        <Dropdown.Item
                            onClick={() => {
                                this.setState(
                                    {
                                        isCourseSelected: true,
                                        selectedCourse: courses[courseId]["courseName"],
                                        selectedCourseName: courses[courseId]["courseName"],
                                        selectedCourseCode: courses[courseId]["courseCode"],
                                        selectedCourseId: courses[courseId]["courseID"]
                                    })

                                this.getClassLink(courses[courseId]["courseID"])
                            }}>
                            {courses[courseId]["courseName"]}
                        </Dropdown.Item>
                    )
                })
                this.setState({courseListView: view})
            })
    }

    getClassLink(courseId) {
        const db = firebase.database();
        db.ref("Courses/" + courseId + "/courseInfo").once("value")
            .then(snapshot => {
                let link = snapshot.val().classLink
                console.log(snapshot.val())
                this.setState({classLink: link})
            })
    }

    postClassLink() {
        const db = firebase.database();
        if (this.state.selectedCourseId !== "")
            db.ref("Courses/" + this.state.selectedCourseId + "/courseInfo")
                .update({"classLink": document.getElementById("classLink").value},
                    function (error) {
                        if (error)
                            alert("failed")
                        else
                            alert("success")
                    })
        else
            alert("Select a course!")
    }


    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <div style={{margin: 20}}>
                                <Card style={{padding: 10, textAlign: "center", boxShadow: 10}}>
                                    <Row>
                                        <Col sm={12} md={6} lg={6}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic"
                                                                 style={{background: "#4396F8"}}>
                                                    {this.state.selectedCourse}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {this.state.courseListView}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Card.Text>{this.state.selectedCourseName}</Card.Text>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Button style={{background: "#4396F8"}}><Link to="create-course"
                                                                                          style={{color: "white"}}>Create
                                                Course</Link></Button>

                                            <Card.Text>{this.state.selectedCourseCode}</Card.Text>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row className="justify-content-center">

                                        {
                                            this.state.editMode ?
                                                <Row >
                                                    <Col sm={2} md={3} lg={4}>
                                                        <Card.Title>Class Link</Card.Title>
                                                    </Col>
                                                    <Col sm={8} md={7} lg={6}>
                                                        <Form>
                                                            <Form.Group>
                                                                <Form.Control id="classLink" type="text"
                                                                              placeholder="Enter Class link"/>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                    <Col sm={2} md={2} lg={2}>
                                                        <Button onClick={() => {
                                                            this.postClassLink();
                                                            this.setState({editMode:false})
                                                        }} variant="primary"  style={{background: "#4396F8"}}>
                                                            Save
                                                        </Button>
                                                    </Col>
                                                </Row>

                                                :
                                                this.state.isCourseSelected ?
                                                    <Row className="">
                                                        <Col>
                                                            <p>{this.state.classLink}</p>
                                                        </Col>
                                                        <Col>
                                                            <Button onClick={()=> this.setState({editMode:true})}>Edit</Button>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <h1></h1>
                                        }
                                    </Row>
                                </Card>
                            </div>
                        </Col>


                    </Row>
                    {this.state.isCourseSelected ? <Row>
                        {/* Annoucnement */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{margin: 20}}>
                                <Link to={"/announcement/" + this.state.selectedCourseId}>
                                    <Card style={{padding: 10, textAlign: "center"}}>
                                        <Card.Title>
                                            Announcement
                                        </Card.Title>
                                        <Card.Body>
                                            A declaration you want to share among the class
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        </Col>
                        {/* DIscussion */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{margin: 20}}>
                                <Card style={{padding: 10, textAlign: "center"}}>
                                    <Card.Title>
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
                            <div style={{margin: 20}}>
                                <Card style={{padding: 10, textAlign: "center"}}>
                                    <Card.Title>
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
                            <div style={{margin: 20}}>
                                <Link to="/assignment">
                                    <Card style={{padding: 10, textAlign: "center"}}>
                                        <Card.Title>
                                            Assignments
                                        </Card.Title>
                                        <Card.Body>
                                            A declaration you want to share among the class
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        </Col>
                        {/* Marks */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{margin: 20}}>
                                <Card style={{padding: 10, textAlign: "center"}}>
                                    <Card.Title>
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
                            <div style={{margin: 20}}>
                                <Card style={{padding: 10, textAlign: "center"}}>
                                    <Card.Title>
                                        Appointments
                                    </Card.Title>
                                    <Card.Body>
                                        Student may get stuck, they want to talk to you personally.
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row> : <h1></h1>}

                </Container>
            </Fragment>
        )
    }
}
