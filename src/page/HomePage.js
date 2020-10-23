import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2'
import TopCardContent from '../component/topContent/TopCardContent'

export default class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Fragment>
                <TopNavigation2/>
                <br/><br/><br/><br/>
                <TopCardContent name={this.props.location.state.name} dp={this.props.location.state.dp} uid={this.props.location.state.uid} />
            </Fragment>
        )
    }
}
