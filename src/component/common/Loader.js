import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap/lib/Tab'
import loading from "../../asset/image/loader.svg';

export default class Loader extends Component {
    render() {
        return (
            <Fragment>
                <Container className="text-center">
                    <Row>
                        <Col>
                            <img src={loading} alt="smiley"/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
