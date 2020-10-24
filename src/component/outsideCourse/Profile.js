import React, { Component, Fragment } from 'react'
import {Container, Row, Col, Card, Dropdown} from 'react-bootstrap'
import firebase from "firebase";

export default class Profile extends Component {
    constructor() {
        super();
        this.state={
            name:"null",
            photoUrl:"",
            email:""
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo(){
        const db = firebase.database();
        db.ref("Teachers/" + firebase.auth().currentUser.uid + "/teacherInfo").once("value")
            .then(snapshot => {

                const info = snapshot.val();

                this.setState({
                    name:info["name"],
                    photoUrl:info["photoUrl"],
                    email:info["email"]
                })
            })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Card className="noticeCard">
                                <Card.Img src={this.state.photoUrl} height="150" width="150"/>
                                <Card.Header>
                                    <Card.Title className="profileText">{this.state.name}</Card.Title>
                                    <Card.Title className="profileText">{this.state.email}</Card.Title>
                                </Card.Header>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
