import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import TopNavigation2 from '../component/topContent/TopNavigation2'
import TopBanner from '../component/topContent/TopBanner'

export default class InsideCourse extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <TopNavigation2/>
                    <TopBanner/>
                </Container>
            </Fragment>
        )
    }
}
