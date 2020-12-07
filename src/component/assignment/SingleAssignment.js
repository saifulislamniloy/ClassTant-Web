import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Dropdown, Form, Row} from "react-bootstrap";
import {getDateTime} from "../../functions/UnixToDateTime";
import Datetime from "react-datetime";
import firebase from "firebase";
import DeleteCard from "../common/DeleteCard";
import EmptySpace from "../common/EmptySpace";
import CardOptions from "../common/CardOptions";
import AssignmentCardHeader from "./AssignmentCardHeader";
import AssignmentCardHeaderEditMode from "./AssignmentCardHeaderEditMode";
import AssignmentCardFooter from "./AssignmentCardFooter";
import AssignmentCardFooterEditMode from "./AssignmentCardFooterEditMode";


class SingleAssignment extends Component {
    constructor() {
        super();
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);

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
        this.setState({assignmentId: deadlineTime})

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
                        this.setState({isDeleted: true})
                    }
                })
        }
    }

    handleEditClick() {
        this.setState({editMode: true})
    }

    handleHeaderChange(text){
        this.setState({title: text.target.value})
    }

    handleDeadlineChange(date){
        this.setState({
            isDeadlineChanged: true,
            deadline: date._d
        })
    }

    handleCancelClick(){
        this.setState({editMode: false})
        this.getSingleAssignment()
    }

    handleUpdateClick(){
        this.setState({editMode: false})
        this.updateSingleAssignment()
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.isDeleted ?
                        <DeleteCard/>
                        :
                        <Card className="topCardDesign">
                            <Card.Header>
                                <Row>
                                    {
                                        this.state.editMode ?
                                            <AssignmentCardHeaderEditMode
                                                title={this.state.title}
                                                onHeaderChange={this.handleHeaderChange}
                                                onDeadlineChange={this.handleDeadlineChange}/>
                                            :
                                            <AssignmentCardHeader
                                                title={this.state.title}
                                                deadline={this.state.deadline}/>
                                    }
                                    <Col sm={6} md={2} lg={2}>
                                        {
                                            this.state.editMode ?
                                                <EmptySpace/>
                                                :
                                                <CardOptions
                                                    onEditModeChange={this.handleEditClick}
                                                    onDelete={this.handleDeleteClick}/>
                                        }
                                    </Col>
                                </Row>
                            </Card.Header>
                            {
                                this.state.editMode
                                    ?
                                    <Card.Body>
                                        <Form>
                                            <Form.Group>
                                                <Form.Control id="des" as="textarea" rows={3} placeholder="Description"
                                                              value={this.state.description}
                                                              onChange={(des) => {
                                                                  this.setState({description: des.target.value})
                                                              }}/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control id="link" type="text" placeholder="Link (Optional)"
                                                              value={this.state.link}
                                                              onChange={(link) => {
                                                                  this.setState({link: link.target.value})
                                                              }}/>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                    :
                                    <Card.Body>
                                        <p className="cardBody alignLeft">{this.state.description}</p>

                                        <a href={"https://" + this.state.link}
                                           target="#">{this.state.link}</a>
                                    </Card.Body>
                            }
                            <Card.Footer>
                                {
                                    this.state.editMode ?
                                        <AssignmentCardFooterEditMode
                                            onCancel={this.handleCancelClick}
                                            onUpdate={this.handleUpdateClick}/>
                                        :
                                        <AssignmentCardFooter
                                            postedBy={this.props.postedBy}
                                            postTime={this.props.postTime}/>
                                }
                            </Card.Footer>
                        </Card>
                }
            </Fragment>
        );
    }
}


export default SingleAssignment;