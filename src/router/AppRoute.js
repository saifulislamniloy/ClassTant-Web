import React, { Component, Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import CreateCoursePage from "../page/CreateCoursePage";
import AuthPage from '../page/AuthPage';
import HomePage from '../page/HomePage';
import AssignmentPage from '../page/AssignmentPage';
import ProfilePage from '../page/ProfilePage';
import AnnouncementPage from "../page/AnnouncementPage";
import ClassSchedulePage from "../page/ClassSchedulePage";
import { CourseProvider } from '../providers/CourseProvider';

class AppRoute extends Component {
    render() {
        return (
            <CourseProvider>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={AuthPage} />
                        <Route exact path="/homepage" component={HomePage} />
                        <Route exact path="/create-course" component={CreateCoursePage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/assignment" component={AssignmentPage} />
                        <Route exact path="/announcement" component={AnnouncementPage} />
                        <Route exact path="/class-schedule" component={ClassSchedulePage} />
                    </Switch>
                </Fragment>
            </CourseProvider>
        );
    }
}

export default AppRoute;