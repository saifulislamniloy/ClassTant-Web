import React, {Component, Fragment} from 'react';
import TopBanner from "../component/topbanner/TopBanner";
import CourseList from "../component/Course/CourseList";
import TopNavigation from '../component/topContent/TopNavigation';

class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <TopBanner/>
                <CourseList/>
            </Fragment>
        );
    }
}

export default HomePage;

