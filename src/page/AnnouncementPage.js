import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Announcement from "../component/announcement/Announcement";

export default class AnnouncementPage extends Component {
    constructor({match}) {
        super();
        this.state={
            courseId:match.params.courseId
        }
    }
    componentDidMount() {
        // alert(this.props.location.state.courseId)
    }

    render() {
        return (
            <Fragment>
                <TopNavigation2 />
                <br/> <br/> <br/>
                <Announcement courseId={this.props.location.state.courseId}/>
            </Fragment>
        )
    }
}
