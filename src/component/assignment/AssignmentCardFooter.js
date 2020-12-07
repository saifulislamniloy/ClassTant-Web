import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {getDateTime} from "../../functions/UnixToDateTime";

class AssignmentCardFooter extends Component {
    render() {
        return (
            <Row>
                <Col sm={6} md={6} lg={6}>
                    <p className="cardFooter">~Author: {this.props.postedBy}</p>
                </Col>
                <Col sm={6} md={6} lg={6}>
                    <p className="cardFooter">{"~Posted on: " + getDateTime(this.props.postTime)}</p>
                </Col>
            </Row>
        );
    }
}

export default AssignmentCardFooter;