import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../page/HomePage";
import CreateCoursePage from "../page/CreateCoursePage";
import AuthPage from '../page/AuthPage';
import InsideCourse from '../page/InsideCourse';
import AttendancePage from '../page/AttendancePage';
import StudentPage from '../page/StudentPage';
import MarksPage from '../page/MarksPage';
import AssignmentPage from '../page/AssignmentPage';
import ResourcePage from '../page/ResourcePage';
import GroupChatPage from '../page/GroupChatPage';
import ReportPage from '../page/ReportPage';
import NotificationPage from '../page/NotificationPage';

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/auth" component={AuthPage}/>
                    <Route exact path="/create-course" component={CreateCoursePage}/>
                    <Route exact path="/notification" component={NotificationPage}/>
                    <Route exact path="/inside-course" component={InsideCourse}/>
                    <Route exact path="/attendance" component={AttendancePage}/>
                    <Route exact path="/student" component={StudentPage}/>
                    <Route exact path="/marks" component={MarksPage}/>
                    <Route exact path="/assignment" component={AssignmentPage}/>
                    <Route exact path="/resource" component={ResourcePage}/>
                    <Route exact path="/group-chat" component={GroupChatPage}/>
                    <Route exact path="/report" component={ReportPage}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;