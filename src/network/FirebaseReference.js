import firebase from "firebase";

function getAssignmentReference(courseId){
    return firebase.database().ref("Courses").child(courseId).child("assignments").once("value")
}

function postAssignmentReference(courseId, deadlineTime){
    return firebase.database().ref("Courses").child(courseId).child("assignments").child(deadlineTime)
}

export {getAssignmentReference, postAssignmentReference}