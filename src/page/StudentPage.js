import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation from '../component/topContent/TopNavigation';
import Student from '../component/insideCourse/Student';

export default class StudentPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <TopBanner/>
                <Student/>
            </Fragment>
        )
    }
}
