import React, {Component, Fragment} from 'react';
import CreateCourse from "../component/Course/CreateCourse.js";
import TopNavigation from '../component/topContent/TopNavigation.js';
import TopBanner from '../component/topContent/TopBanner.js';

class CreateCoursePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <TopBanner/>
                <CreateCourse/>
            </Fragment>
        );
    }
}

export default CreateCoursePage;