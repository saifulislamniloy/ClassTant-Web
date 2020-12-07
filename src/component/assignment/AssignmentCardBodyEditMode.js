import React, {Component} from 'react';
import {Form} from "react-bootstrap";

class AssignmentCardBodyEditMode extends Component {
    constructor(props) {
        super(props);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
    }

    handleDescriptionChange(des) {
        this.props.onDescriptionChange(des);
    }

    handleLinkChange(link) {
        this.props.onLinkChange(link);
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Control id="des" as="textarea" rows={3} placeholder="Description"
                                  value={this.props.description}
                                  onChange={(des) => this.handleDescriptionChange(des)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control id="link" type="text" placeholder="Link (Optional)"
                                  value={this.props.link}
                                  onChange={(link) => this.handleLinkChange(link)}/>
                </Form.Group>
            </Form>
        );
    }
}

export default AssignmentCardBodyEditMode;