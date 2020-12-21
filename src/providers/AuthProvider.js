import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [currentRole, setCurrentRole] = useState("student");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                currentUser: currentUser,
                setCurrentUser: setCurrentUser,
                currentRole: currentRole,
                setCurrentRole: setCurrentRole,
                isLoggedIn: isLoggedIn,
                setIsLoggedIn: setIsLoggedIn
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };