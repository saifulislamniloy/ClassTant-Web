import React from 'react'
import SingleAssignment from "../component/assignment/SingleAssignment";
import { getKeys } from '../functions/JSON';
import { getAssignmentReference, postAssignmentReference } from "./FirebaseReference";

function getAssignmentList(self) {
    getAssignmentReference(self.props.courseId)
        .then(snapshot => {
            const assignments = snapshot.val();
            const assignmentId = getKeys(assignments)

            const view = assignmentId.slice(0).reverse().map((assignmentId, index) => {
                return (
                    <SingleAssignment
                        key={index}
                        id={assignments[assignmentId]["assignmentId"]}
                        courseId={self.props.courseId}
                        authorId={assignments[assignmentId]["authorId"]}
                        title={assignments[assignmentId]["assignmentName"]}
                        description={assignments[assignmentId]["assignmentDescription"]}
                        link={assignments[assignmentId]["url"]}
                        postedBy={assignments[assignmentId]["postedBy"]}
                        postTime={assignments[assignmentId]["creationTime"]}
                        deadline={assignments[assignmentId]["deadline"]}
                        currentUserId={self.state.uid}
                    />
                )
            })
            self.setState({ assignmentView: view, loading: false })
        })
}

function postAssignment(self) {
    self.setState({ loading: true })

    const deadlineTime = new Date(self.state.deadline).getTime().toString();

    let assignmentDescription = self.state.description
    let assignmentId = deadlineTime
    let assignmentName = self.state.title
    let authorId = self.state.uid
    let creationTime = new Date().getTime().toString()
    let deadline = self.state.deadline + ""
    let postedBy = self.state.name
    let url = self.state.link

    let jsonObject = { assignmentDescription, assignmentId, assignmentName, authorId, creationTime, deadline, postedBy, url }
    let validationResult = validation(assignmentName, authorId, postedBy, deadline)
    if (validationResult) {
        postAssignmentReference(self.props.courseId, deadlineTime)
            .update(
                jsonObject,
                function (error) {
                    if (error)
                        alert("failed")
                }).then(() => { getAssignmentList(self) })
    }
}

function validation(assignmentName, authorId, postedBy, deadline) {
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

export {getAssignmentList, postAssignment};