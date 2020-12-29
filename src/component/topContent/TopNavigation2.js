import React, { Component, Fragment } from 'react'
import '../../asset/css/custom.css';
import '../../asset/css/bootstrap.min.css';
import {Container, Navbar, Nav, Button} from 'react-bootstrap'
import {NavLink} from "react-router-dom";
import {auth} from "../../firebase";
import icon from "../../asset/image/home-icon.png";
import profile from"../../asset/icon/profile.svg";
import Image from "react-bootstrap/Image";

export default class TopNavigation2 extends Component {
    constructor() {
        super();
        this.state={
            imageUrl:""
        }
    }
    logout(){
        sessionStorage.clear()
        auth.signOut()
    }
    async componentDidMount() {
        let user = JSON.parse(await sessionStorage.getItem("classtantUser"));
        if (user !== null)
            this.setState({imageUrl: user.photoUrl})
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Navbar fixed="top" bg="light" variant="light" collapseOnSelect expand="lg">
                        <Navbar.Brand className="title" href="/homepage" ><img src={icon} height="32" width="32" alt="Smiley face"/>  Classtant</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" >
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav >
                                <NavLink exact activeStyle={{color: '#03d3fc'}} className="m-2" to="/create-course" ><Button> Join or Create Course </Button>  </NavLink>
                                <NavLink exact activeStyle={{color: '#03d3fc'}} className="m-2" to="/" ><Button onClick={()=>{this.logout()}}>Log Out </Button>  </NavLink>
                                <NavLink exact activeStyle={{color: '#03d3fc'}} className="m-2" to="/profile"> <Image src={this.state.imageUrl} height="40"/>  </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </Fragment>
        )
    }
}
