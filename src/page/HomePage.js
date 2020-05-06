import React, {Component, Fragment} from 'react';
import Sidenavbar from "../component/sidebar/Sidenavbar";
import TopBanner from "../component/topbanner/TopBanner";

class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopBanner/>
                <Sidenavbar/>
            </Fragment>
        );
    }
}

export default HomePage;