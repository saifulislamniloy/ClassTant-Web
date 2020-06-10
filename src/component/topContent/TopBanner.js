import React, {Component, Fragment} from 'react';
import {Container} from "react-bootstrap";

class TopBanner extends Component {
    render() {
        return (
            <Fragment>
                <Container fluid={true} className="banner p-0">
                    <Container className="text-center">
                        <br/><br/><br/>
                        <h1 className="title">ClassTant</h1>
                        <h4 className="subTitle">A Smart Academic System</h4>
                    </Container>
                </Container>
            </Fragment>
        );
    }
}

export default TopBanner;