import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Attendance from '../component/insideCourse/Attendance';

export default class AttendancePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2 />
                <TopBanner />
                <Attendance />
            </Fragment>
        )
    }
}
