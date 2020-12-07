import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";

class AssignmentCardFooterEditMode extends Component {
    constructor(props) {
        super(props);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }

    handleCancelClick() {
        this.props.onCancel();
    }

    handleUpdateClick() {
        this.props.onUpdate();
    }

    render() {
        return (
            <Row>
                <Col>
                    <Button
                        onClick={this.handleCancelClick}>Cancel</Button>
                </Col>
                <Col>
                    <Button
                        onClick={this.handleUpdateClick}>Update</Button>
                </Col>
            </Row>
        );
    }
}

export default AssignmentCardFooterEditMode;