import React, {Component, Fragment} from 'react';
import {Card, Container} from "react-bootstrap";

class DeleteCard extends Component {
    render() {
        return (
            <Fragment>
                <Container className="common">
                    <Card className="delete-card">
                        <Card.Title>Deleted</Card.Title>
                    </Card>
                </Container>
            </Fragment>
        );
    }
}

export default DeleteCard;