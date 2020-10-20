import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Profile from '../component/outsideCourse/Profile';

export default class ProfilePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2/>
                <br/> <br/> <br/>
                <Profile/>
            </Fragment>
        )
    }
}
