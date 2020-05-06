import React, {Component} from 'react';
import Sidebar from "react-sidebar";
import '../../asset/css/custom.css';
import '../../asset/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";

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
                    <b>Sidebar content
                        <br/><NavLink to="/dash">DashBoard</NavLink>
                        <br/><NavLink to="/profile">Profile</NavLink>
                        <br/><NavLink to="/notification">Notification</NavLink>
                        <br/><NavLink to="/create-course">Create Course</NavLink>
                        <br/><NavLink to="/logout">Log Out</NavLink>
                    </b>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
            >
                <button onClick={() => this.onSetSidebarOpen(true)}>
                    MENU
                </button>
            </Sidebar>
        );
    }
}

export default Sidenavbar;