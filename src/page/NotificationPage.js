import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation from '../component/topContent/TopNavigation';
import Notification from '../component/insideCourse/Notification';

export default class NotificationPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <TopBanner/>
                <Notification/>
            </Fragment>
        )
    }
}
