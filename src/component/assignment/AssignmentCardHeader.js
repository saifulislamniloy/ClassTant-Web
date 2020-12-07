import React, {Component} from 'react';
import {Col} from "react-bootstrap";

class AssignmentCardHeader extends Component {
    render() {
        return (
            <Col sm={6} md={10} lg={10} className="cardTitle">
                <p className="cardTitle">{this.props.title}</p>
                <p className="cardFooter">{"~Deadline: " + this.props.deadline}</p>
            </Col>
        );
    }
}

export default AssignmentCardHeader;