import React, {Component} from 'react';
import {Col} from "react-bootstrap";

class AssignmentCardHeader extends Component {
    render() {
        return (
            <div  className="cardTitle">
                <p className="cardTitle">{this.props.title}</p>
                <p className="cardFooter">{"~Deadline: " + this.props.deadline}</p>
            </div>
        );
    }
}

export default AssignmentCardHeader;