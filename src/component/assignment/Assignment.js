import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { CourseContext } from '../../providers/CourseProvider'
import Loader from '../common/Loader';
import { getAssignmentList, postAssignment } from '../../network/AssignmentFunctions';

export default class Assignment extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            assignmentView: "",
            uid: "",
            name: "",
            title:"",
            description: "",
            link: "",
            deadline: ""
        }
    }

    async componentDidMount() {
        console.log(document)
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"))
        if (user !== null) {
            this.setState({ uid: user.uid, name: user.name })
        }
        getAssignmentList(this)
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
                                                    <Form.Control id="header" type="text" placeholder="Header" onChange={(text) => this.setState({title:text.target.value})}/>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control id="des" as="textarea" row={3} placeholder="Description" onChange={(text) => this.setState({description:text.target.value})} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control id="link" type="text" placeholder="Link (Optional)" onChange={(text) => this.setState({link:text.target.value})} />
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
                                            <Button onClick={() => postAssignment(this)} variant="primary">
                                                Post
                                            </Button>
                                        </Card>
                                        :
                                        <span></span>}
                                </Col>
                            )}
                        </CourseContext.Consumer>
                        <Col lg={12} md={12} sm={12}>
                            {this.state.loading ? <Loader /> : this.state.assignmentView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
