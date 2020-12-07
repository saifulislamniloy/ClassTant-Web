import React, {Component} from 'react';

class AssignmentCardBody extends Component {
    render() {
        return (
            <div>
                <p className="cardBody alignLeft">{this.props.description}</p>

                <a href={"https://" + this.props.link} target="#">{this.props.link}</a>
            </div>
        );
    }
}

export default AssignmentCardBody;