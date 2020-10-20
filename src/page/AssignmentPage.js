import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Assignment from '../component/insideCourse/Assignment';

export default class AssignmentPage extends Component {
    render() {
        return (
            <Fragment>
            <TopNavigation2 />
            <Assignment />
        </Fragment>
        )
    }
}
