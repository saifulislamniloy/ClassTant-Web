import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { CourseContext } from '../../providers/CourseProvider'

export default class CourseInfo extends Component {
    render() {
        return (
            <CourseContext.Consumer>
                {(course) => (
                    <Card>
                        <Card.Header>
                            <Card.Title
                                className="courseName">{course.currentCourse.selectedCourseName}</Card.Title>
                            <Card.Title
                                className="courseCode">{course.currentCourse.selectedCourseCode}</Card.Title>

                            <Card.Title className="courseSecret">
                                Course Secret: <p
                                    style={{ color: "#007BFF" }}>{course.currentCourse.selectedCourseId}</p>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                )}
            </CourseContext.Consumer>
        )
    }
}
