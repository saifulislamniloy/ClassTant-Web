import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import Url from '../../Url.js';
import Authorization from '../auth/Authorization.js';

export default class Marks extends Component {
    constructor() {
        super();
        this.state = {
            marksView: ""
        }
    }

    componentDidMount() {
        this.getMarksList();
    }

    getMarksList() {
        axios.get(Url.marks + "/" + Authorization.getCourseId())
            .then(res => {
                const data = res.data;
                const view = data.map(data => {
                    return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.marks}</td>
                        </tr>
                    )
                })
                this.setState({ marksView: view })
            })
    }
    addMarks(){
        let id = document.getElementById("id").value;
        let marks = document.getElementById("marks").value;

        let JsonObject = { id: id, marks: marks}

        axios.post(Url.marks+"/"+Authorization.getCourseId(), JsonObject, {
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
                                    <Form.Control id="marks" type="text" placeholder="Marks" />
                                </Form.Group>
                            </Form>
                            <Button onClick={() => this.addMarks()} variant="primary">
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
                                        <th>Marks</th>
                                        {this.state.marksView}
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
