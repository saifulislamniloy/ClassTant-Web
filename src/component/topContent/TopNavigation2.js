import React, { Component, Fragment } from 'react'
import '../../asset/css/custom.css';
import '../../asset/css/bootstrap.min.css';
import { Container, Navbar, Nav} from 'react-bootstrap'
import {NavLink} from "react-router-dom";

export default class TopNavigation2 extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Navbar fixed="top" bg="light" variant="light" collapseOnSelect expand="lg">
                        <Navbar.Brand className="title" href="/" ><img src="https://s3.amazonaws.com/somewherein/assets/images/thumbs/iutbd_1363355287_2-IUT_1.209173425.jpg" height="32" width="32" alt="Smiley face"/>  Classtant</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" >
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav >
                                <NavLink exact activeStyle={{color: '#03d3fc'}} className="sideMenuTitle" to="/profile"> Profile  </NavLink>
                                <NavLink exact activeStyle={{color: '#03d3fc'}} className="sideMenuTitle" to="/auth"> Log Out  </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </Fragment>
        )
    }
}
