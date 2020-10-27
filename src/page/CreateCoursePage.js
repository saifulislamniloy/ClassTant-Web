import React, {Component, Fragment} from 'react';
import CreateCourse from "../component/course/CreateCourse.js";
import TopNavigation2 from '../component/topContent/TopNavigation2.js';

class CreateCoursePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2/>
                <br/><br/><br/>
                <CreateCourse/>
            </Fragment>
        );
    }
}

export default CreateCoursePage;