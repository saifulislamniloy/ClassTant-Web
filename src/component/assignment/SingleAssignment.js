import React, { Component, Fragment } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import firebase from "firebase";
import DeleteCard from "../common/DeleteCard";
import EmptySpace from "../common/EmptySpace";
import CardOptions from "../common/CardOptions";
import AssignmentCardHeader from "./AssignmentCardHeader";
import AssignmentCardHeaderEditMode from "./AssignmentCardHeaderEditMode";
import AssignmentCardFooter from "./AssignmentCardFooter";
import AssignmentCardFooterEditMode from "./AssignmentCardFooterEditMode";
import AssignmentCardBody from "./AssignmentCardBody";
import AssignmentCardBodyEditMode from "./AssignmentCardBodyEditMode";


class SingleAssignment extends Component {
    constructor() {
        super();
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);

        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);

        this.state = {
            editMode: false,
            isDeleted: false,
            title: "",
            description: "",
            link: "",
            isDeadlineChanged: false,
            deadline: "",
            assignmentId: ""
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            description: this.props.description,
            deadline: this.props.deadline,
            link: this.props.link,
            assignmentId: this.props.id
        })
    }

    getSingleAssignment() {
        const db = firebase.database();
        db.ref("Courses/" + this.props.courseId + "/assignments/" + this.state.assignmentId).once("value")
            .then(snapshot => {

                const assignment = snapshot.val();

                this.setState({
                    title: assignment.assignmentName,
                    description: assignment.assignmentDescription,
                    link: assignment.url,
                    deadline: assignment.deadline
                })
            })
    }

    async updateSingleAssignment() {
        const db = firebase.database();
        const deadlineTime = new Date(this.state.deadline).getTime().toString();
        this.setState({ assignmentId: deadlineTime })

        let assignmentDescription = this.state.description
        let assignmentId = deadlineTime
        let assignmentName = this.state.title
        let authorId = this.props.authorId
        let creationTime = this.props.postTime
        let postedBy = this.props.postedBy
        let deadline = this.state.deadline + ""
        let url = this.state.link

        let jsonObject = {
            assignmentDescription,
            assignmentId,
            assignmentName,
            authorId,
            creationTime,
            deadline,
            postedBy,
            url
        }
        let validationResult = this.validation(assignmentName, authorId, postedBy, deadline)
        if (validationResult) {
            await db.ref("Courses/" + this.props.courseId + "/assignments/" + this.props.id)
                .remove(onerror => {
                    if (onerror)
                        alert("Something Went Wrong!")
                    else {
                        db.ref("Courses/" + this.props.courseId + "/assignments/" + deadlineTime)
                            .update(
                                jsonObject,
                                function (error) {
                                    if (error)
                                        alert("failed")
                                })
                    }
                })
        }
    }

    validation(assignmentName, authorId, postedBy, deadline) {
        let result = true;
        if (assignmentName.length < 1) {
            alert("Header can not be empty!")
            result = false
        }
        if (authorId == null) {
            alert("Something went wrong! Pleas sign in again.")
            result = false
        }
        if (postedBy == null) {
            result = false
            alert("Something went wrong! Pleas sign in again.")
        }
        if (deadline.length < 12) {
            alert("Please Set Deadline.")
            result = false
        }
        return result
    }

    handleDeleteClick() {
        let isConfirmed = window.confirm("Do you confirm to delete: " + this.state.title + "?");
        if (isConfirmed) {
            const db = firebase.database();
            db.ref("Courses/" + this.props.courseId + "/assignments/" + this.props.id)
                .remove(onerror => {
                    if (onerror)
                        alert("Something Went Wrong!")
                    else {
                        this.setState({ isDeleted: true })
                    }
                })
        }
    }

    handleEditClick() {
        this.setState({ editMode: true })
    }

    handleHeaderChange(text) {
        this.setState({ title: text.target.value })
    }

    handleDeadlineChange(date) {
        this.setState({
            isDeadlineChanged: true,
            deadline: date._d
        })
    }

    handleDescriptionChange(des) {
        this.setState({ description: des.target.value })
    }

    handleLinkChange(link) {
        this.setState({ link: link.target.value })
    }

    handleCancelClick() {
        this.setState({ editMode: false })
        this.getSingleAssignment()
    }

    handleUpdateClick() {
        this.setState({ editMode: false })
        this.updateSingleAssignment()
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.isDeleted ?
                        <DeleteCard />
                        :
                        <Card className="topCardDesign">
                            <Card.Header>
                                {
                                    this.state.editMode ?
                                        <Row>
                                            <Col sm={6} md={10} lg={10}>
                                                <AssignmentCardHeaderEditMode
                                                    title={this.state.title}
                                                    onHeaderChange={this.handleHeaderChange}
                                                    onDeadlineChange={this.handleDeadlineChange} />
                                            </Col>
                                            <Col sm={6} md={2} lg={2}>
                                                <EmptySpace />
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col sm={6} md={10} lg={10}>
                                                <AssignmentCardHeader
                                                    title={this.state.title}
                                                    deadline={this.state.deadline} />
                                            </Col>
                                            <Col sm={6} md={2} lg={2}>
                                                {this.props.authorId === this.props.currentUserId ?
                                                    <CardOptions
                                                        authorId={this.props.authorId}
                                                        currentUserId={this.props.currentUserId}
                                                        onEditModeChange={this.handleEditClick}
                                                        onDelete={this.handleDeleteClick} />
                                                    : <span></span>
                                                }

                                            </Col>
                                        </Row>
                                }
                            </Card.Header>
                            <Card.Body>
                                {
                                    this.state.editMode
                                        ?
                                        <AssignmentCardBodyEditMode
                                            description={this.state.description}
                                            link={this.state.link}
                                            onDescriptionChange={this.handleDescriptionChange}
                                            onLinkChange={this.handleLinkChange} />
                                        :
                                        <AssignmentCardBody
                                            description={this.state.description}
                                            link={this.state.link} />
                                }
                            </Card.Body>
                            <Card.Footer>
                                {
                                    this.state.editMode ?
                                        <AssignmentCardFooterEditMode
                                            onCancel={this.handleCancelClick}
                                            onUpdate={this.handleUpdateClick} />
                                        :
                                        <AssignmentCardFooter
                                            postedBy={this.props.postedBy}
                                            postTime={this.props.postTime} />
                                }
                            </Card.Footer>
                        </Card>
                }
            </Fragment>
        );
    }
}


export default SingleAssignment;