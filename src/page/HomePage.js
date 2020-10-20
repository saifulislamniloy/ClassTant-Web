import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2'
import TopCardContent from '../component/topContent/TopCardContent'

export default class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation2/>
                <br/><br/><br/><br/>
                <TopCardContent/>
            </Fragment>
        )
    }
}
