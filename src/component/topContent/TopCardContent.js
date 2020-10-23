import React, {Component} from 'react'
import {Fragment} from 'react'
import {Card, Container, Row, Col, Dropdown, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import firebase from "firebase";

export default class TopCardContent extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedCourse:"Select Course",
            isCourseSelected:false,
            selectedCourseName:"Course Name",
            selectedCourseCode:"Course Code",
            selectedCourseId:"",
            courseListView:"",

            classLink:""
        }
    }
    componentDidMount() {
        this.getCourseList()
    }

    getCourseList(){
        const db = firebase.database();
        db.ref("Teachers/"+this.props.uid+"/courseList").once("value" )
            .then(snapshot =>{

                const courses = snapshot.val();
                console.log(courses)
                const courseId = []
                for (var key in courses){
                    courseId.push(key)
                    console.log(key +" "+ courses[key]["courseName"])
                }

                const view = courseId.map(courseId => {
                    return (
                        <Dropdown.Item
                            onClick={()=>{
                                this.getClassLink()
                                this.setState(
                                    {isCourseSelected:true,
                                        selectedCourse: courses[courseId]["courseName"],
                                        selectedCourseName: courses[courseId]["courseName"],
                                        selectedCourseCode:courses[courseId]["courseCode"],
                                        selectedCourseId:courses[courseId]["courseID"]})}}>
                            {courses[courseId]["courseName"]}
                        </Dropdown.Item>
                    )
                })
                this.setState({courseListView:view})
        })
    }

    getClassLink(){
        const db = firebase.database();
        db.ref("Test/classLink").once("value" )
            .then(snapshot =>{
                this.setState({classLink:snapshot.val()})
            })
    }

    postClassLink(){
        const db = firebase.database();
        db.ref("test/classLink").update({"link":document.getElementById("classLink").value})
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <div style={{margin: 20}}>
                                <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
                                    <Row>
                                        <Col sm={12} md={6} lg={6}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    {this.state.selectedCourse}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {this.state.courseListView}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Button style={{margin: 10}}><Link to="create-course"
                                                                               style={{color: "white"}}>Create
                                                Course</Link></Button>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Card.Text>{this.state.selectedCourseName}</Card.Text>
                                            <Card.Text>{this.state.selectedCourseCode}</Card.Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={12}>
                            <div style={{margin: 20}}>
                                <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
                                    <Row>
                                        <Col sm={2} md={3} lg={4}>
                                            <Card.Title>Class Link</Card.Title>
                                        </Col>
                                        <Col sm={8} md={7} lg={6}>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control id="classLink" type="text" placeholder="Enter Class link" />
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                        <Col sm={2} md={2} lg={2}>
                                            <Button onClick={() => this.postClassLink()} variant="primary">
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        {/* Annoucnement */}
                        <Col sm={6} md={6} lg={4}>
                            <div style={{margin: 20}}>
                                <Link to={"/announcement/"+this.state.selectedCourseId}>
                                    <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
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
                                <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
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
                                <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
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
                                   <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
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
                                <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
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
                                <Card style={{padding: 10, textAlign: "center", color: "white", background: "blue"}}>
                                    <Card.Title>
                                        Appointments
                                    </Card.Title>
                                    <Card.Body>
                                        Student may get stuck, they want to talk to you personally.
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
