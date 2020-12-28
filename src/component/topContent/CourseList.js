import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { CourseContext } from '../../providers/CourseProvider'
import firebase, { auth } from "../../firebase";

export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCourse: "Select Course",
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
                console.log(courses)
                const courseId = []
                for (var key in courses) {
                    courseId.push(key)
                    console.log(key + " " + courses[key]["courseName"])
                }
                console.log("Inside Child component+ " + this.props.uid)
                this.setState({ loading: false })

                const view = courseId.map(courseId => {
                    return (
                        <CourseContext.Consumer>
                            {
                                (course) => (
                                    <Dropdown.Item
                                        onClick={() => {
                                            course.setIsCourseSelected(true);
                                            course.setClassLink(courses[courseId]["classLink"])
                                            course.setCurrentCourse({
                                                selectedCourse: courses[courseId]["courseName"],
                                                courseName: courses[courseId]["courseName"],
                                                selectedCourseCode: courses[courseId]["courseCode"],
                                                selectedCourseId: courses[courseId]["courseID"]
                                            })

                                            this.setState({ selectedCourse: courses[courseId]["courseName"] })

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
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {this.state.loading ? <div className="loader"></div> : this.state.selectedCourse}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.state.courseListView}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
