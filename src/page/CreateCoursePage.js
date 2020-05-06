import React, {Component, Fragment} from 'react';
import Sidenavbar from "../component/sidebar/Sidenavbar";
import CreateCourse from "../component/Course/CreateCourse";

class CreateCoursePage extends Component {
    render() {
        return (
            <Fragment>
                <Sidenavbar/>
                <CreateCourse/>
            </Fragment>
        );
    }
}

export default CreateCoursePage;