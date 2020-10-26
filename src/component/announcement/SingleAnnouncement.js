import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Dropdown, Row} from "react-bootstrap";
import {getDateTime} from "../../functions/UnixToDateTime";

class SingleAnnouncement extends Component {
    render() {
        return (
            <Fragment>
                <Card className="topCardDesign">
                    <Card.Header>
                        <Row>
                            <Col sm={6} md={10} lg={10} className="cardTitle">
                                {this.props.title}
                            </Col>
                            <Col sm={6} md={2} lg={2}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary">
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="disabled">
                                            Edit (Disabled)
                                        </Dropdown.Item>
                                        <Dropdown.Item className="disabled">
                                            Delete (Disabled)
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <p className="cardBody text-justify">{this.props.description}</p>

                        <a href={"https://" + this.props.link}
                           target="#">{this.props.link}</a>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col sm={6} md={6} lg={6}>
                                <p className="cardFooter">~Author: {this.props.postedBy}</p>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <p className="cardFooter">{getDateTime(this.props.postTime)}</p>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Fragment>
        );
    }
}

export default SingleAnnouncement;