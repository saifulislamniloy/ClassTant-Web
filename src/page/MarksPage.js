import React, { Component, Fragment } from 'react'
import TopBanner from "../component/topContent/TopBanner";
import TopNavigation2 from '../component/topContent/TopNavigation2';
import Marks from '../component/insideCourse/Marks';

export default class MarksPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2 />
                <TopBanner />
                <Marks />
            </Fragment>
        )
    }
}
