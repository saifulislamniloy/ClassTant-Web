import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Assignment from '../component/insideCourse/Assignment';

export default class AssignmentPage extends Component {
    render() {
        return (
            <Fragment>
            <TopNavigation2 />
            <TopBanner />
            <Assignment />
        </Fragment>
        )
    }
}
