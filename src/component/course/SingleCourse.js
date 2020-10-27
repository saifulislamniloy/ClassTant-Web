import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Dropdown, Row} from "react-bootstrap";

class SingleCourse extends Component {
    render() {
        return (
            <Fragment>
                <Card className="topCardDesign">
                    <Card.Header>
                        <Row>
                            <Col sm={6} md={10} lg={10} >
                                <p className="cardTitle">{this.props.courseName}</p>
                                <p className="cardFooter">{this.props.courseCode}</p>
                                <p className="cardFooter">Department: {this.props.department}</p>
                                <p className="cardFooter">Course Secret:</p>
                                <p className="cardFooter" style={{color:"#007BFF"}}>{this.props.courseSecret}</p>
                            </Col>
                            <Col sm={6} md={2} lg={2}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary">
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="disabled">
                                            Edit (Coming Soon)
                                        </Dropdown.Item>
                                        <Dropdown.Item className="disabled">
                                            Delete (Coming Soon)
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card.Header>
                </Card>
            </Fragment>
        );
    }
}

export default SingleCourse;