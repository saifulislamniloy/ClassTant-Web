import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { CourseContext } from '../../providers/CourseProvider'
import firebase from "../../firebase";

export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseListView: "",
            uid: "",
            loading: true
        };
    }

    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"))
        if (user !== null) {
            this.setState({ uid: user.uid })
            this.getCourseList()
        }
    }

    getCourseList() {
        const db = firebase.database();
        db.ref("Users/" + this.state.uid + "/courseList").once("value")
            .then(snapshot => {

                const courses = snapshot.val();

                const courseId = []

                for (var key in courses) 
                    courseId.push(key)
                
                this.setState({ loading: false })

                const view = courseId.map((courseId, index) => {
                    return (
                        <CourseContext.Consumer key={index}>
                            {
                                (course) => (
                                    <Dropdown.Item
                                        onClick={() => {
                                            course.setIsCourseSelected(true);
                                            course.setClassLink(courses[courseId]["classLink"])
                                            course.setSelectedCourseName(courses[courseId]["courseName"])
                                            course.setCurrentCourse({
                                                selectedCourse: courses[courseId]["courseName"],
                                                courseName: courses[courseId]["courseName"],
                                                selectedCourseCode: courses[courseId]["courseCode"],
                                                selectedCourseId: courses[courseId]["courseID"],
                                                teacherId: courses[courseId]["teacherID"]
                                            })

                                        }}>
                                        {courses[courseId]["courseName"]}
                                    </Dropdown.Item>
                                )
                            }
                        </CourseContext.Consumer>
                    )
                })
                this.setState({ courseListView: view })
            })
    }

    render() {
        return (
            <CourseContext.Consumer>
                {(course) => (
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {this.state.loading ? <div className="loader"></div> : course.selectedCourseName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.state.courseListView}
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </CourseContext.Consumer>
        )
    }
}
