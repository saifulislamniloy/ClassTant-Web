import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

export default class Profile extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Card className="noticeCard">
                                <Card.Title className="cardTitle text-center">Ridwan Kabir</Card.Title>
                                <Card.Text className="cardSubTitle text-center">Assitant Professor</Card.Text>
                                <Card.Text className="cardSubTitle text-center">Dept. of Computer Science & Engineering</Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
