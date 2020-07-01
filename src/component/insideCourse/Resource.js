import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import Authorization from '../auth/Authorization';
import axios from 'axios';
import Url from '../../Url.js';

export default class Resource extends Component {
    constructor() {
        super();
        this.state = {
            resourceView: ""
        }
    }

    componentDidMount() {
        this.getResourceList();
    }

    getResourceList(){
        axios.get(Url.resource + "/" + Authorization.getCourseId())
        .then(res => {
            const data = res.data;
            const view = data.map(data => {
                return (
                    <Card className="noticeCard">
                        <Card.Title className="text-center">{data.header}</Card.Title>
                        <a href={""+data.link} target="#"><Card.Text className="text-center">{data.link}</Card.Text></a>
                    </Card>
                )
            })
            this.setState({ resourceView: view })
        })
    }

    postResource(){

        let header = document.getElementById("header").value;
        let link = document.getElementById("link").value;
        let JsonObject = { header: header, link: link}

        axios.post(Url.resource+"/"+Authorization.getCourseId(), JsonObject, {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
              this.getResourceList();
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
                            <Card className="noticeCard">
                                <Form>
                                    <Form.Group>
                                        <Form.Control id="header" type="text" placeholder="Header" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control id="link" type="text" placeholder="Link" />
                                    </Form.Group>
                                </Form>
                                <Button onClick={() => this.postResource()} variant="primary">
                                    Post
                                </Button>
                            </Card>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            {this.state.resourceView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
