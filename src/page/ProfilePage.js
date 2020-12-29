import React, { Component, Fragment } from 'react'
import TopNavigation from '../component/topContent/TopNavigation';
import Profile from '../component/profile/Profile';

export default class ProfilePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <br/> <br/> <br/>
                <Profile/>
            </Fragment>
        )
    }
}
