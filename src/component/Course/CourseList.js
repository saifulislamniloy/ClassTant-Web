import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Url from "../../url/url";
import {Card, Col, Container, Row} from "react-bootstrap";

class CourseList extends Component {
    constructor() {
        super();
        this.state={
            courseData:[]
        }
    }
    componentDidMount() {
        alert("Inside ComponentDidMount")
        axios.get(Url.courses)
            .then(result=>{
                this.setState({courseData:result})
                console.log(result);
                alert("Inside Getting Result")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const courseList = this.state.courseData;
        const view = courseList.map(courseList=>{
            return  (<Col sm={12} md={6} lg={4} className="p-2">
                <div>
                    <Card className="card">
                        <Card.Body>
                            <Card.Title className="title">{courseList.CourseTitle}</Card.Title>
                            <Card.Text className="subtitle">
                                {courseList.CourseId}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </div>
            </Col>)
        })
        return (
            <Fragment>
                <Container>
                    <Row>
                        {view}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default CourseList;