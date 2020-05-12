import React, {Component} from 'react';
import Sidebar from "react-sidebar";
import '../../asset/css/custom.css';
import '../../asset/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";
import dashBoard from "../../asset/icon/dashboard.svg"
import menu from "../../asset/icon/menu.svg"
import profile from "../../asset/icon/profile.svg"
import notification from "../../asset/icon/notification.svg"
import createCourse from "../../asset/icon/create.svg"
import logout from "../../asset/icon/exit.svg"

class Sidenavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        return (
            <Sidebar
                sidebar={
                    <b>
                        <br/><Container><img src={dashBoard} width="20px" height="20px"/><NavLink className="sideMenuTitle" to="/">DashBoard</NavLink></Container>
                        <br/><Container><img src={profile} width="20px" height="30px"/><NavLink className="sideMenuTitle" to="/profile">Profile</NavLink></Container>
                        <br/><Container><img src={notification} width="20px" height="20px"/><NavLink className="sideMenuTitle" to="/notification">Notification</NavLink></Container>
                        <br/><Container><img src={createCourse} width="20px" height="20px"/><NavLink className="sideMenuTitle" to="/create-course">Create Course</NavLink></Container>
                        <br/><Container><img src={logout} width="20px" height="20px"/><NavLink className="sideMenuTitle" to="/logout">Log Out</NavLink></Container>
                    </b>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
            >
                <button className="m-3" onClick={() => this.onSetSidebarOpen(true)}>
                    <img src={menu} width="25px" height="25px"/>
                </button>
            </Sidebar>
        );
    }
}

export default Sidenavbar;