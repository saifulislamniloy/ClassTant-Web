/* eslint-disable react/jsx-key */
import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Url from '../../Url.js';
import {Card, Col, Container, Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Authorization from '../auth/Authorization.js';

class CourseList extends Component {
    constructor() {
        super();
        this.state={
            courseData:[],
            courseListView:""
        }
    }

    componentDidMount() {
        axios.get(Url.courseList+"/"+Authorization.getId())
        .then(res => {
          this.setState({ courseData:res });
          const courseList = res.data;
          const view = courseList.map(courseList=>{
              return  (<Col sm={12} md={6} lg={4} className="p-2">
                  <div>
                      <Link to={"/inside-course"}>
                        <Card className="card">
                            <Card.Body>
                                <Card.Title className="cardTitle">{courseList.title}</Card.Title>
                                <Card.Text className="subtitle">
                                    {courseList.courseTeacher}
                                </Card.Text>
                                <Card.Text className="subtitle">
                                    {courseList.geustTeacher}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Link>
                  </div>
              </Col>)
          })
          this.setState({courseListView:view})
        })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        {this.state.courseListView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default CourseList;