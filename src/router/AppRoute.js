import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../page/HomePage";
import CreateCoursePage from "../page/CreateCoursePage";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/create-course" component={CreateCoursePage}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;