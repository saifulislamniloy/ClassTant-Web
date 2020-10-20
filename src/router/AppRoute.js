import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import CreateCoursePage from "../page/CreateCoursePage";
import AuthPage from '../page/AuthPage';
import InsideCourse from '../page/HomePage';
import StudentPage from '../page/StudentPage';
import AssignmentPage from '../page/AssignmentPage';
import ResourcePage from '../page/ResourcePage';
import ProfilePage from '../page/ProfilePage';

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={InsideCourse}/>
                    <Route exact path="/auth" component={AuthPage}/>
                    <Route exact path="/create-course" component={CreateCoursePage}/>
                    <Route exact path="/profile" component={ProfilePage}/>
                    <Route exact path="/student" component={StudentPage}/>
                    <Route exact path="/assignment" component={AssignmentPage}/>
                    <Route exact path="/resource" component={ResourcePage}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;