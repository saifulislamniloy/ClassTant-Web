import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../page/HomePage";
import CreateCoursePage from "../page/CreateCoursePage";
import AuthPage from '../page/AuthPage';
import InsideCourse from '../page/InsideCourse';

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/auth" component={AuthPage}/>
                    <Route exact path="/create-course" component={CreateCoursePage}/>
                    <Route exact path="/inside-course" component={InsideCourse}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;