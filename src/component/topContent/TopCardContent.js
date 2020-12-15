import React, {Component} from 'react'
import {Fragment} from 'react'
import {Card, Container, Row, Col, Dropdown, Button, Form, Image} from 'react-bootstrap'
import "../../asset/css/text.css"
import {Link} from 'react-router-dom';
import firebase from "firebase";
import happyEmoji from "../../asset/icon/happy.svg";

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
            editMode: false,

            uid: ""
        }
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"))
        if (user !== null) {
            this.setState({uid: user.uid})
            this.getCourseList()
        }
    }

    getCourseList() {
        const db = firebase.database();
        db.ref("Users/" + this.state.uid + "/courseList").once("value")
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
                if (link !== undefined)
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
                        // else
                        //     alert("success")
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
                            <div>
                                <Card className="topCardDesign">
                                    <Row>
                                        <Col sm={12} md={12} lg={12} className="mb-5">
                                            <p className="moto">Bring Your Academics in One App </p>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    {this.state.selectedCourse}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {this.state.courseListView}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </Col>
                                        <Col sm={12} md={12} lg={12}>
                                            {
                                                this.state.isCourseSelected ?

                                                    <Card>
                                                        <Card.Header>
                                                            <Card.Title
                                                                className="courseName">{this.state.selectedCourseName}</Card.Title>
                                                            <Card.Title
                                                                className="courseCode">{this.state.selectedCourseCode}</Card.Title>

                                                            <Card.Title className="courseSecret">
                                                                Course Secret: <p
                                                                style={{color: "#007BFF"}}>{this.state.selectedCourseId}</p>
                                                            </Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            {
                                                                this.state.editMode ?
                                                                    <Row className="classLink">
                                                                        <Col sm={8} md={8} lg={8}>
                                                                            <Form>
                                                                                <Form.Group>
                                                                                    {
                                                                                        this.state.classLink.length > 0 ?
                                                                                            <Form.Control id="classLink"
                                                                                                          type="text"
                                                                                                          value={this.state.classLink}
                                                                                                          onChange={(text) =>
                                                                                                              this.setState({classLink: text})}/>
                                                                                            :
                                                                                            <Form.Control id="classLink"
                                                                                                          type="text"
                                                                                                          placeholder="Enter Class link (Complete URL)"/>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Form>
                                                                        </Col>
                                                                        <Col sm={2} md={2} lg={2}>
                                                                            <Button onClick={() => {
                                                                                this.setState({
                                                                                    editMode: false,
                                                                                    classLink: ""
                                                                                })
                                                                                this.getClassLink(this.state.selectedCourseId)
                                                                            }}>
                                                                                Cancel
                                                                            </Button>
                                                                        </Col>
                                                                        <Col sm={2} md={2} lg={2}>
                                                                            <Button onClick={() => {
                                                                                this.postClassLink();
                                                                                this.setState({
                                                                                    editMode: false,
                                                                                    classLink: ""
                                                                                })
                                                                                this.getClassLink(this.state.selectedCourseId)
                                                                            }}>
                                                                                Save
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>

                                                                    :
                                                                    this.state.isCourseSelected ?
                                                                        <Row>
                                                                            <Col sm={10} md={10} lg={10}>
                                                                                <Card.Title
                                                                                    className="classLink pt-2">
                                                                                    Class Link: <a
                                                                                    href={this.state.classLink}
                                                                                    target="#">{this.state.classLink}</a>
                                                                                </Card.Title>
                                                                            </Col>
                                                                            <Col sm={2} md={2} lg={2}>
                                                                                <Button onClick={() => {
                                                                                    this.setState({editMode: true})
                                                                                }}>
                                                                                    Edit
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                        :
                                                                        <h1></h1>
                                                            }
                                                        </Card.Body>
                                                    </Card>
                                                    :
                                                    <h1></h1>
                                            }
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>


                    </Row>
                    {this.state.isCourseSelected ? <Row>
                            {/* Annoucnement */}
                            <Col sm={6} md={6} lg={4}>
                                <div>
                                    <Link to={{
                                        pathname: "/announcement",
                                        state: {courseId: this.state.selectedCourseId}
                                    }}
                                          className="link">
                                        <Card className="primaryCardDesign" onContextMenu={e=>e.preventDefault()}>
                                            <Card.Header className="primaryCardHeader">
                                                <Card.Title>
                                                    Announcement
                                                </Card.Title>
                                            </Card.Header>
                                            <Card.Body className="primaryCardBody">
                                                A declaration you want to share among the class
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            </Col>
                            {/* Assignments */}
                            <Col sm={6} md={6} lg={4}>
                                <div>
                                    <Link to={{
                                        pathname: "/assignment",
                                        state: {courseId: this.state.selectedCourseId}
                                    }} className="link">
                                        <Card className="primaryCardDesign" onContextMenu={e=>e.preventDefault()}>
                                            <Card.Header className="primaryCardHeader">
                                                <Card.Title>
                                                    Assignments
                                                </Card.Title>
                                            </Card.Header>
                                            <Card.Body className="primaryCardBody">
                                                A declaration you want to share among the class
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            </Col>
                            {/* DIscussion */}
                            <Col sm={6} md={6} lg={4}>
                                <div onClick={() => alert("Coming Soon :)")}>
                                    <Card className="primaryCardDesign" onContextMenu={e=>e.preventDefault()}>
                                        <Card.Header className="primaryCardHeader">
                                            <Card.Title>
                                                Discussion
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body className="primaryCardBody">
                                            A conversion or a debate about specific topic
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            {/* Class Schedule */}
                            <Col sm={6} md={6} lg={4}>
                                <div>
                                    <Link to={{
                                        pathname: "/class-schedule",
                                        state: {courseId: this.state.selectedCourseId}
                                    }} className="link">
                                        <Card className="primaryCardDesign" onContextMenu={e=>e.preventDefault()}>
                                            <Card.Header className="primaryCardHeader">
                                                <Card.Title>
                                                    Class Schedule
                                                </Card.Title>
                                            </Card.Header>
                                            <Card.Body className="primaryCardBody">
                                                Schedule your whole course or edit your class time
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            </Col>
                            {/* Marks */}
                            <Col sm={6} md={6} lg={4}>
                                <div onClick={() => alert("Coming Soon :)")}>
                                    <Card className="primaryCardDesign" onContextMenu={e=>e.preventDefault()}>
                                        <Card.Header className="primaryCardHeader">
                                            <Card.Title>
                                                Marks
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body className="primaryCardBody">
                                            Let your student know about their performance
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            {/* Appointments */}
                            <Col sm={6} md={6} lg={4}>
                                <div onClick={() => alert("Coming Soon :)")}>
                                    <Card className="primaryCardDesign" onContextMenu={e=>e.preventDefault()}>
                                        <Card.Header className="primaryCardHeader">
                                            <Card.Title>
                                                Appointments
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body className="primaryCardBody">
                                            Student may get stuck, they want to talk to you personally.
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                        :
                        <Row className="text-center">
                            <Col sm={12} lg={12} md={12}>
                                <p className="emptyScreenText">Welcome to Classtant</p>
                                <p className="emptyScreenText">Select or create a new course</p>
                            </Col>
                            <Col sm={12} lg={12} md={12}>
                                <Image src={happyEmoji} height="150"/>
                            </Col>
                        </Row>
                    }

                </Container>
            </Fragment>
        )
    }
}
