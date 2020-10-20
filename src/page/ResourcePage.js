import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Resource from '../component/insideCourse/Resource';

export default class ResourcePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2 />
                <Resource />
            </Fragment>
        )
    }
}
