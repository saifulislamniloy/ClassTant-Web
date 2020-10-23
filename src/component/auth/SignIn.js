import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase,{auth} from "../../firebase";

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    state = {isSignedIn: false};
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: result => {
                auth
                    .signInWithPopup(firebase.auth.GoogleAuthProvider.PROVIDER_ID)
                    .then(function (result) {
                        const token = result.credential.accessToken;
                        const user = result.user;
                        console.log("User: " + user);
                    })
                    .catch(function (error) {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        const email = error.email;
                        const credential = error.credential;
                    });
            }
        }
    };
    componentDidMount = () => {
        auth.onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user});
            console.log("user Details", user);
        });
    };

    render() {
        return (
            <div>
                {this.state.isSignedIn ? (
                    <div className="firebaseLogin">
                        <div className="welcome">
                            <h2>Welcome to ClassTant</h2>
                        </div>
                        <div className="userCorner">
                            {auth.currentUser.displayName}
                            <img
                                src={auth.currentUser.photoURL}
                                className="avatar"
                            />
                            <button
                                className="btn btn-primary left"
                                onClick={() => auth.signOut()}>
                                Sign Out!
                            </button>
                        </div>
                        <div>
                            <Redirect
                                to={{
                                    pathname: "/homepage",
                                    state: {
                                        name: auth.currentUser.displayName,
                                        dp: auth.currentUser.photoURL,
                                        uid: auth.currentUser.uid
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={auth}
                        />
                        <Redirect to={{pathname: "/"}}/>
                    </div>
                )}
            </div>
        );
    }
}

export default SignIn;