import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Announcement from "../component/insideCourse/Announcement";

export default class AnnouncementPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2 />
                <br/> <br/> <br/>
                <Announcement />
            </Fragment>
        )
    }
}
