import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Assignment from '../component/assignment/Assignment';

export default class AssignmentPage extends Component {
    constructor({match}) {
        super();
        this.state={
            courseId:match.params.courseId
        }
    }
    render() {
        return (
            <Fragment>
            <TopNavigation2 />
                <br/> <br/> <br/>
            <Assignment courseId={this.state.courseId}/>
        </Fragment>
        )
    }
}
