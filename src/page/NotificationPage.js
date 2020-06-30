import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Notification from '../component/insideCourse/Notification';

export default class NotificationPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2/>
                <TopBanner/>
                <Notification/>
            </Fragment>
        )
    }
}
