import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation from '../component/topContent/TopNavigation';
import Profile from '../component/outsideCourse/Profile';

export default class ProfilePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <TopBanner/>
                <Profile/>
            </Fragment>
        )
    }
}
