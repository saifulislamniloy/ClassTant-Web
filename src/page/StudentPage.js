import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Student from '../component/insideCourse/Student';

export default class StudentPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2 />
                <TopBanner />
                <Student />
            </Fragment>
        )
    }
}
