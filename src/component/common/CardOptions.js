import React, {Component} from 'react';
import {Dropdown} from "react-bootstrap";

class CardOptions extends Component {
    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleEditClick() {
        this.props.onEditModeChange();
    }

    handleDeleteClick() {
        this.props.onDelete();
    }

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="primary">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={this.handleEditClick}>
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.handleDeleteClick}>
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default CardOptions;