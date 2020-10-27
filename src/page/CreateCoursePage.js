import React, {Component, Fragment} from 'react';
import Course from "../component/course/Course.js";
import TopNavigation2 from '../component/topContent/TopNavigation2.js';

class CreateCoursePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2/>
                <br/><br/><br/>
                <Course/>
            </Fragment>
        );
    }
}

export default CreateCoursePage;