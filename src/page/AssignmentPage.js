import React, { Component, Fragment } from 'react'
import TopNavigation from '../component/topContent/TopNavigation';
import Assignment from '../component/assignment/Assignment';

export default class AssignmentPage extends Component {
    render() {
        return (
            <Fragment>
            <TopNavigation />
                <br/> <br/> <br/>
            <Assignment courseId={this.props.location.state.courseId}/>
        </Fragment>
        )
    }
}
