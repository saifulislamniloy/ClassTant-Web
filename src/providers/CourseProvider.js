import React, { useState } from 'react';

const CourseContext = React.createContext();

const CourseProvider = (props) => {
    const [currentCourse, setCurrentCourse] = useState({});
    const [classLink, setClassLink] = useState("");
    const [isCourseSelected, setIsCourseSelected] = useState(false);
    const [classLinkEditMode, setClassLinkEditMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <CourseContext.Provider
            value={{
                currentCourse: currentCourse,
                setCurrentCourse: setCurrentCourse,

                classLinkEditMode:classLinkEditMode,
                setClassLinkEditMode:setClassLinkEditMode,

                classLink:classLink,
                setClassLink:setClassLink,

                isCourseSelected: isCourseSelected,
                setIsCourseSelected: setIsCourseSelected,

                isLoggedIn: isLoggedIn,
                setIsLoggedIn: setIsLoggedIn
            }}>
            {props.children}
        </CourseContext.Provider>
    )
}

export { CourseContext, CourseProvider };