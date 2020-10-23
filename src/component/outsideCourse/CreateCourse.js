import React, { Component, Fragment } from 'react';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from 'axios';
import Url from '../../Url.js';
import Authorization from '../auth/Authorization.js';
import {FirebaseDatabaseMutation, FirebaseDatabaseProvider} from "@react-firebase/database";
import firebase from "../../firebase";

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            courseView: ""
        }
    }
    componentDidMount() {
        this.getcoursetList();
    }

    getcoursetList() {
        axios.get(Url.courseList + "/" + Authorization.getId())
            .then(res => {
                const data = res.data;
                const view = data.map(data => {
                    return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                            <td>{data.creditHour}</td>
                            <td>{data.courseCode}</td>
                            <td>{data.courseTeacher}</td>
                            <td>{data.geustTeacher}</td>
                        </tr>
                    )
                })
                this.setState({ courseView: view })
            })
    }

    addCourse(){
        let id = document.getElementById("id").value;
        let title = document.getElementById("title").value;
        let hour = document.getElementById("hour").value;
        let code = document.getElementById("code").value;
        let guest = document.getElementById("guest").value;

        let JsonObject = { id: id, title: title, creditHour: hour, courseCode:code, courseTeacher:Authorization.getTeacherName() ,geustTeacher: guest}

        axios.post(Url.courseList+"/"+Authorization.getCourseId(), JsonObject, {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
              this.getStudentList();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <Col lg={12} md={12} sm={12}>
                                <h1>Add New Course</h1>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control id="id" type="text" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Course Title</Form.Label>
                                        <Form.Control id="title" type="text" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Credit Hour</Form.Label>
                                        <Form.Control id="hour" type="text" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Course Code</Form.Label>
                                        <Form.Control id="code" type="text" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Guest Teacher</Form.Label>
                                        <Form.Control id="guest" type="text" />
                                    </Form.Group>
                                    <FirebaseDatabaseProvider firebase={firebase}>
                                        <FirebaseDatabaseMutation type="update" path={"test/"}>
                                            {({runMutation}) => {
                                                return (
                                                    <div>
                                                        <button
                                                            data-testid="test-push"
                                                            variant="primary"
                                                            onClick={async () => {

                                                                let id = document.getElementById("id").value;
                                                                let title = document.getElementById("title").value;
                                                                let hour = document.getElementById("hour").value;
                                                                let code = document.getElementById("code").value;
                                                                let guest = document.getElementById("guest").value;

                                                                const {key} = await runMutation({
                                                                    TEST: "DATA",
                                                                    ID: id,
                                                                    TITLE: title
                                                                });
                                                                console.log(key);
                                                            }}
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                );
                                            }}
                                        </FirebaseDatabaseMutation>
                                    </FirebaseDatabaseProvider>
                                </Form>
                            </Col>
                            <br/>
                            <Col lg={12} md={12} sm={12}>
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <table className="table table-bordered table-striped mb-0">
                                        <th>ID</th>
                                        <th>Course Title</th>
                                        <th>Credit Hour</th>
                                        <th>Course Code</th>
                                        <th>Course Teacher</th>
                                        <th>Guest Teacher</th>
                                        {this.state.courseView}
                                    </table>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default CreateCourse;