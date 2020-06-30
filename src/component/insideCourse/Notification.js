import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import Authorization from '../auth/Authorization';
import axios from 'axios';
import Url from '../../Url.js';

export default class Notification extends Component {
    constructor() {
        super();
        this.state = {
            noticeView: ""
        }
    }

    componentDidMount() {
        this.getNotificationList();
    }

    getNotificationList(){
        axios.get(Url.notification + "/" + Authorization.getCourseId())
        .then(res => {
            const data = res.data;
            const view = data.map(data => {
                return (
                    <Card className="noticeCard">
                        <Card.Title className="text-center">{data.header}</Card.Title>
                        <Card.Text className="text-center">{data.description}</Card.Text>
                    </Card>
                )
            })
            this.setState({ noticeView: view })
        })
    }

    postNotification(){

        let header = document.getElementById("header").value;
        let description = document.getElementById("des").value;
        let JsonObject = { header: header, description: description}

        axios.post(Url.notification+"/"+Authorization.getCourseId(), JsonObject, {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
              this.getNotificationList();
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
                                        <Form.Control id="des" type="text" placeholder="Desccription" />
                                    </Form.Group>
                                </Form>
                                <Button onClick={() => this.postNotification()} variant="primary">
                                    Post
                            </Button>
                            </Card>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            {this.state.noticeView}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
