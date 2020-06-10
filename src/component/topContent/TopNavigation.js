import React, { Component, Fragment } from 'react'
import '../../asset/css/custom.css';
import '../../asset/css/bootstrap.min.css';
import { Container, Navbar, Nav} from 'react-bootstrap'
import {NavLink} from "react-router-dom";
import dashBoard from "../../asset/icon/dashboard.svg"
import profile from "../../asset/icon/profile.svg"
import notification from "../../asset/icon/notification.svg"
import createCourse from "../../asset/icon/create.svg"
import logout from "../../asset/icon/exit.svg"

export default class TopNavigation extends Component {
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
                                <NavLink exact activeStyle={{color: '#002C42'}} className="sideMenuTitle" to="/"><img src={dashBoard} width="20px" height="20px" alt="Smiley face"/> DashBoard  </NavLink>
                                <NavLink exact activeStyle={{color: '#002C42'}} className="sideMenuTitle" to="/profile"><img src={profile} width="20px" height="20px" alt="Smiley face"/> Profile  </NavLink>
                                <NavLink exact activeStyle={{color: '#002C42'}} className="sideMenuTitle" to="/notification"><img src={notification} width="20px" height="20px" alt="Smiley face"/> Notification  </NavLink>
                                <NavLink exact activeStyle={{color: '#002C42'}} className="sideMenuTitle" to="/create-course"><img src={createCourse} width="20px" height="20px" alt="Smiley face"/> Create Course  </NavLink>
                                <NavLink exact activeStyle={{color: '#002C42'}} className="sideMenuTitle" to="/logout"><img src={logout} width="20px" height="20px" alt="Smiley face"/> Log Out  </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </Fragment>
        )
    }
}
