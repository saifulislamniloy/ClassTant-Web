import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import Datetime from "react-datetime";

class AssignmentCardHeaderEditMode extends Component {
    constructor(props) {
        super(props);
        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    }

    handleHeaderChange(text) {
        this.props.onHeaderChange(text);
    }

    handleDeadlineChange(date) {
        this.props.onDeadlineChange(date);
    }

    render() {
        return (
            <div>
                <Form.Group className="cardTitle">
                    <Form.Control id="header" type="text" placeholder="Header"
                                  value={this.props.title}
                                  onChange={(text)=>this.handleHeaderChange(text)}/>
                </Form.Group>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <Form.Label>Deadline</Form.Label>
                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Datetime
                            dateFormat="MMMM DD, YYYY"
                            id="date"
                            onChange={(date) => this.handleDeadlineChange(date)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AssignmentCardHeaderEditMode;