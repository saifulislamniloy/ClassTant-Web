import React, { Component, Fragment } from 'react'
import TopNavigation from '../component/topContent/TopNavigation';
import Announcement from "../component/announcement/Announcement";

export default class AnnouncementPage extends Component {
    constructor({ match }) {
        super();
        this.state = {
            courseId: match.params.courseId
        }
    }

    render() {
        return (
            <Fragment>
                <TopNavigation />
                <br /> <br /> <br />
                <Announcement courseId={this.props.location.state.courseId} />
            </Fragment>
        )
    }
}
