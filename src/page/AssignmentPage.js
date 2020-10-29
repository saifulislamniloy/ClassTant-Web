import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Assignment from '../component/assignment/Assignment';

export default class AssignmentPage extends Component {
    render() {
        return (
            <Fragment>
            <TopNavigation2 />
                <br/> <br/> <br/>
            <Assignment courseId={this.props.location.state.courseId}/>
        </Fragment>
        )
    }
}
