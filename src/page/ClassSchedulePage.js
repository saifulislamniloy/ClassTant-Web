import React, {Component, Fragment} from 'react';
import TopNavigation2 from "../component/topContent/TopNavigation2";
import ClassSchedule from "../component/class-schedule/ClassSchedule";

class ClassSchedulePage extends Component {
    constructor({match}) {
        super();
        this.state={
            courseId:match.params.courseId
        }
    }

    render() {
        return (
            <Fragment>
                <TopNavigation2 />
                <br/> <br/> <br/>
                <ClassSchedule courseId={this.props.location.state.courseId}/>
            </Fragment>
        );
    }
}

export default ClassSchedulePage;