import React, { Component } from 'react'
import { Fragment } from 'react'
import { Card, Container, Row, Col, Image } from 'react-bootstrap'
import "../../asset/css/text.css"
import { Link } from 'react-router-dom';
import happyEmoji from "../../asset/icon/happy.svg";
import CourseList from './CourseList';
import { CourseProvider, CourseContext } from '../../providers/CourseProvider'
import CourseInfo from '../../component/topContent/CourseInfo'
import ClassLink from './ClassLink';
import ClassLinkEditMode from './ClassLinkEditMode';

export default class TopCardContent extends Component {
    render() {
        return (
            <CourseContext.Consumer>
                {(course) => (
                    <Fragment>
                        <Container>
                            <Row>
                                <Col sm={12} md={12} lg={12}>
                                    <div>
                                        <Card className="topCardDesign">
                                            <Row>
                                                <Col sm={12} md={12} lg={12} className="mb-5">
                                                    <p className="moto">Bring Your Academics in One App </p>
                                                    <CourseList />
                                                </Col>
                                                <Col sm={12} md={12} lg={12}>
                                                    <CourseInfo />
                                                    <ClassLink />
                                                    <ClassLinkEditMode />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                            {course.isCourseSelected ?
                                <Row>
                                    {/* Annoucnement */}
                                    <Col sm={6} md={6} lg={4}>
                                        <div>
                                            <Link to={{
                                                pathname: "/announcement",
                                                state: { courseId: course.currentCourse.selectedCourseId }
                                            }}
                                                className="link">
                                                <Card className="primaryCardDesign" onContextMenu={e => e.preventDefault()}>
                                                    <Card.Header className="primaryCardHeader">
                                                        <Card.Title>
                                                            Announcement
                                                </Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="primaryCardBody">
                                                        A declaration you want to share among the class
                                            </Card.Body>
                                                </Card>
                                            </Link>
                                        </div>
                                    </Col>
                                    {/* Assignments */}
                                    <Col sm={6} md={6} lg={4}>
                                        <div>
                                            <Link to={{
                                                pathname: "/assignment",
                                                state: { courseId: course.currentCourse.selectedCourseId }
                                            }} className="link">
                                                <Card className="primaryCardDesign" onContextMenu={e => e.preventDefault()}>
                                                    <Card.Header className="primaryCardHeader">
                                                        <Card.Title>
                                                            Assignments
                                                </Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="primaryCardBody">
                                                        A declaration you want to share among the class
                                            </Card.Body>
                                                </Card>
                                            </Link>
                                        </div>
                                    </Col>
                                    {/* DIscussion */}
                                    <Col sm={6} md={6} lg={4}>
                                        <div onClick={() => alert("Coming Soon :)")}>
                                            <Card className="primaryCardDesign" onContextMenu={e => e.preventDefault()}>
                                                <Card.Header className="primaryCardHeader">
                                                    <Card.Title>
                                                        Discussion
                                            </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="primaryCardBody">
                                                    A conversion or a debate about specific topic
                                        </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                    {/* Class Schedule */}
                                    <Col sm={6} md={6} lg={4}>
                                        <div>
                                            <Link to={{
                                                pathname: "/class-schedule",
                                                state: { courseId: course.currentCourse.selectedCourseId }
                                            }} className="link">
                                                <Card className="primaryCardDesign" onContextMenu={e => e.preventDefault()}>
                                                    <Card.Header className="primaryCardHeader">
                                                        <Card.Title>
                                                            Class Schedule
                                                </Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="primaryCardBody">
                                                        Schedule your whole course or edit your class time
                                            </Card.Body>
                                                </Card>
                                            </Link>
                                        </div>
                                    </Col>
                                    {/* Marks */}
                                    <Col sm={6} md={6} lg={4}>
                                        <div onClick={() => alert("Coming Soon :)")}>
                                            <Card className="primaryCardDesign" onContextMenu={e => e.preventDefault()}>
                                                <Card.Header className="primaryCardHeader">
                                                    <Card.Title>
                                                        Marks
                                            </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="primaryCardBody">
                                                    Let your student know about their performance
                                        </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                    {/* Appointments */}
                                    <Col sm={6} md={6} lg={4}>
                                        <div onClick={() => alert("Coming Soon :)")}>
                                            <Card className="primaryCardDesign" onContextMenu={e => e.preventDefault()}>
                                                <Card.Header className="primaryCardHeader">
                                                    <Card.Title>
                                                        Appointments
                                            </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="primaryCardBody">
                                                    Student may get stuck, they want to talk to you personally.
                                        </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>
                                :
                                <Row className="text-center">
                                    <Col sm={12} lg={12} md={12}>
                                        <p className="emptyScreenText">Welcome to Classtant</p>
                                        <p className="emptyScreenText">Select or create a new course</p>
                                    </Col>
                                    <Col sm={12} lg={12} md={12}>
                                        <Image src={happyEmoji} height="150" />
                                    </Col>
                                </Row>
                            }

                        </Container>
                    </Fragment>
                )}
            </CourseContext.Consumer>
        )
    }
}
