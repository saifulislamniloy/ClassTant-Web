import React, {Component, Fragment} from 'react'
import TopNavigation from '../component/topContent/TopNavigation'
import TopCardContent from '../component/topContent/TopCardContent'

export default class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <br/><br/><br/><br/>
                <TopCardContent/>
            </Fragment>
        )
    }
}
