const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();

getCourseList = function(){

    db.ref('Teachers').child(TeacherId).child('courseList').once('value', (courseListSnap) => {
        const courseList = courseListSnap.val()

        
    })
}

export {getCourseList};