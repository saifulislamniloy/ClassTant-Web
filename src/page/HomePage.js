import React, {Component, Fragment} from 'react';
import Sidenavbar from "../component/sidebar/Sidenavbar";
import TopBanner from "../component/topbanner/TopBanner";
import CourseList from "../component/Course/CourseList";

class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopBanner/>
                <CourseList/>
                <Sidenavbar/>
            </Fragment>
        );
    }
}

export default HomePage;