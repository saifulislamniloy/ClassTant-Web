import firebase from "firebase";
import React, { Component, Fragment } from 'react';
import { Button, Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { getDateTime } from "../../functions/UnixToDateTime";
import { removeUrlError } from "../../functions/Utility";

class SingleAnnouncement extends Component {
    constructor() {
        super();
        this.state={
            editMode:false,
            isDeleted:false,
            title:"",
            description:"",
            link:""
        }
    }
    componentDidMount() {
        this.setState({
            title:this.props.title,
            description:this.props.description,
            link:this.props.link
        })
    }

    getSingleAnnouncement(){
        const db = firebase.database();
        db.ref("Courses/" + this.props.courseId + "/announcements/"+this.props.id).once("value")
            .then(snapshot => {

                const announcement = snapshot.val();
                this.setState({
                    title:announcement.title,
                    description:announcement.description,
                    link:announcement.link
                })
            })
    }

    updateSingleAnnouncement(){
        const db = firebase.database();
        if (this.validation()) {
            db.ref("Courses/" + this.props.courseId + "/announcements/" + this.props.id)
                .update(
                    {
                        "title":this.state.title,
                        "description":this.state.description,
                        "link":this.state.link
                    },
                    function (error) {
                        if (error)
                            alert("failed")
                    })
        }
    }

    validation() {
        if (this.state.title.length < 1) {
            alert("Title can not be empty!")
            return false
        } else
            return true
    }

    deleteSingleAnnouncement(){
        let isConfirmed = window.confirm("Do you confirm to delete: " + this.state.title + "?");
        if(isConfirmed){
            const db = firebase.database();
            if (this.validation()) {
                db.ref("Courses/" + this.props.courseId + "/announcements/" + this.props.id)
                    .remove(onerror=>{
                        if(onerror){
                            alert("Failed!")
                        }else {
                            this.setState({isDeleted:true})
                        }
                    })
            }
        }
    }


    render() {
        return (
            <Fragment>
                {
                    this.state.isDeleted ?
                        <Card className="deletedCard">
                            <Card.Title>Deleted</Card.Title>
                        </Card>
                        :
                        <Card className="topCardDesign">
                            <Card.Header>
                                <Row>
                                    <Col sm={6} md={10} lg={10} className="cardTitle">
                                        {
                                            this.state.editMode ?
                                                <Form.Group>
                                                    <Form.Control id="header" type="text" placeholder="Title"
                                                                  value={this.state.title}
                                                                  onChange={(text)=>{this.setState({title:text.target.value})}}/>
                                                </Form.Group>
                                                :
                                                this.state.title
                                        }
                                    </Col>
                                    {this.props.authorId === this.props.currentUserId ?
                                    <Col sm={6} md={2} lg={2}>
                                    {
                                        this.state.editMode ?
                                            <span></span>
                                            :
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary">
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={()=>this.setState({editMode:true})}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={()=>this.deleteSingleAnnouncement()}>
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                    }
                                </Col>
                                :
                                <span></span>}
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
                                                              onChange={(des)=>{this.setState({description:des.target.value})}}/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control id="link" type="text" placeholder="Link (Optional)"
                                                              value={this.state.link}
                                                              onChange={(link)=>{this.setState({link:link.target.value})}}/>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                    :
                                    <Card.Body>
                                        <p className="cardBody alignLeft">{this.state.description}</p>

                                        <a href={removeUrlError(this.state.link)}
                                           target="#">{this.state.link}</a>
                                    </Card.Body>
                            }
                            <Card.Footer>
                                {
                                    this.state.editMode
                                        ?
                                        <Row>
                                            <Col>
                                                <Button
                                                    onClick={()=>{
                                                        this.setState({editMode:false})
                                                        this.getSingleAnnouncement()}}>Cancel</Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    onClick={()=>{
                                                        this.setState({editMode:false})
                                                        this.updateSingleAnnouncement()
                                                        this.getSingleAnnouncement()}}>Update</Button>
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col sm={6} md={6} lg={6}>
                                                <p className="cardFooter">~Author: {this.props.postedBy}</p>
                                            </Col>
                                            <Col sm={6} md={6} lg={6}>
                                                <p className="cardFooter">{"~Posted on: "+getDateTime(this.props.postTime)}</p>
                                            </Col>
                                        </Row>
                                }
                            </Card.Footer>
                        </Card>
                }
            </Fragment>
        );
    }
}

export default SingleAnnouncement;