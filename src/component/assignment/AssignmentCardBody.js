import React, { Component } from 'react';
import { removeUrlError } from '../../functions/Utility';

class AssignmentCardBody extends Component {
    render() {
        return (
            <div>
                <p className="cardBody alignLeft">{this.props.description}</p>

                <a href={removeUrlError(this.props.link)} target="#">{this.props.link}</a>
            </div>
        );
    }
}

export default AssignmentCardBody;