import React, { Component, Fragment } from 'react'
import '../../asset/css/custom.css';
import '../../asset/css/bootstrap.min.css';
import {Container, Navbar, Nav, Button} from 'react-bootstrap'
import {NavLink} from "react-router-dom";
import {auth} from "../../firebase";
import icon from "../../asset/image/home-icon.png";

export default class TopNavigation2 extends Component {
    logout(){
        auth.signOut()
    }
    render() {
        return (
            <Fragment>
                <Container>
                    <Navbar fixed="top" bg="light" variant="light" collapseOnSelect expand="lg">
                        <Navbar.Brand className="title" href="/" ><img src={icon} height="32" width="32" alt="Smiley face"/>  Classtant</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" >
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav >
                                <NavLink exact activeStyle={{color: '#03d3fc'}} className="sideMenuTitle" to="/profile"> Profile  </NavLink>
                                <NavLink exact activeStyle={{color: '#03d3fc'}} className="sideMenuTitle" to="/" ><Button onClick={()=>{this.logout()}}>Log Out </Button>  </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </Fragment>
        )
    }
}
