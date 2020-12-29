import React, {Component, Fragment} from 'react';
import Course from "../component/course/Course.js";
import TopNavigation from '../component/topContent/TopNavigation.js';

class CreateCoursePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <br/><br/><br/>
                <Course/>
            </Fragment>
        );
    }
}

export default CreateCoursePage;