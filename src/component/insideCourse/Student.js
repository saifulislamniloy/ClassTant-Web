import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Url from '../../Url.js';
import Authorization from '../auth/Authorization.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default class Student extends Component {
    constructor() {
        super();
        this.state = {
            studentView: ""
        }
    }

    componentDidMount() {
        this.getStudentList();
    }

    getStudentList() {
        axios.get(Url.student + "/" + Authorization.getCourseId())
            .then(res => {
                const data = res.data;
                const view = data.map(data => {
                    return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.section}</td>
                        </tr>
                    )
                })
                this.setState({ studentView: view })
            })
    }


    addStudent() {
        let id = document.getElementById("id").value;
        let name = document.getElementById("name").value;
        let section = document.getElementById("section").value;

        let JsonObject = { id: id, name: name, section: section }

        axios.post(Url.student+"/"+Authorization.getCourseId(), JsonObject, {
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
                        <Col lg={6} md={12} sm={12}>
                            <Form>
                                <Form.Group>
                                    <Form.Control id="id" type="text" placeholder="Id" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control id="name" type="text" placeholder="Name" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control id="section" type="text" placeholder="Section" />
                                </Form.Group>
                            </Form>
                            <Button onClick={() => this.addStudent()} variant="primary">
                                Add
                            </Button>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                            <Col lg={12} md={12} sm={12}>
                                <h6>Student List</h6>
                            </Col>
                            <Col lg={12} md={12} sm={12}>
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <table className="table table-bordered table-striped mb-0">
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Section</th>
                                        {this.state.studentView}
                                    </table>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
