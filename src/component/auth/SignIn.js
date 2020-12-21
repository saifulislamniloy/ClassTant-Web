import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase, { auth } from "../../firebase";
import { Card, Col, Image, Row } from "react-bootstrap";

import banner from "../../asset/image/play_store_badge.png"
import { AuthContext } from "../../providers/AuthProvider";

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    state = { isSignedIn: false };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccess: result => {
                auth.signInWithPopup(firebase.auth.GoogleAuthProvider.PROVIDER_ID)
                    .then(function (result) {
                        const token = result.credential.accessToken;
                        console.log(result.user)
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

    componentWillUnmount() {
        this.storeCredential()
    }

    async storeCredential() {
        let user = {
            email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            photoUrl: auth.currentUser.photoURL,
            uid: auth.currentUser.uid
        }
        await sessionStorage.setItem("classtantUser", JSON.stringify(user));

        if (this.validation()) {
            firebase.database().ref("Users/" + auth.currentUser.uid).update({
                email: auth.currentUser.email,
                name: auth.currentUser.displayName,
                photoUrl: auth.currentUser.photoURL,
                uid: auth.currentUser.uid
            }).then(onerror => {

            }
            )
        }
    }

    validation() {
        if (auth.currentUser.uid === null) {
            alert("Something went wrong! Log out and Sign In again.")
            return false;
        }
        else if (auth.currentUser.uid === undefined) {
            alert("Something went wrong! Log out and Sign In again.")
            return false;
        }
        else
            return true
    }


    componentDidMount = () => {
        auth.onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user });
            console.log("user Details", user);
        });
    };

    render() {
        return (
            <Fragment>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <h4 className="pt-5 pl-5 pr-5 text-center">Bring your academics in one app</h4>
                        <p className="pb-5 pl-5 pr-5 text-justify">
                            It's an educational app that will help you to bring every academic related stuff in one app.
                            You can manage everything related to your academic stuff. Currently we all use some social
                            platform to handle academy related stuff. And we all know that this is not healthy for us.
                            Some of us get addicted to social media and also it create social dilemma.
                            So, we decided to being a good alternative of social media to you to prevent this social
                            dilemma.
                        </p>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="text-center">
                        <p>Login as Teacher</p>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <div>
                            {this.state.isSignedIn ? (
                                <div className="firebaseLogin">
                                    <div>
                                        <Redirect to={{ pathname: "/homepage" }} />
                                    </div>
                                </div>
                            ) : (
                                    <div>
                                        <StyledFirebaseAuth
                                            uiConfig={this.uiConfig}
                                            firebaseAuth={auth}
                                        />
                                        <Redirect to={{ pathname: "/" }} />
                                    </div>
                                )}
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="text-center">
                        <p>For Students' Use</p>
                        <a href="https://play.google.com/store/apps/details?id=com.classtant.android" target="#"> <Image
                            src={banner} height="75" /></a>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6} lg={6}>
                        <h4 className="pt-5 pl-5 pr-5 text-center">About Classtant</h4>
                        <p className="pb-5 pl-5 pr-5 text-justify">
                            It's an educational app that will help you to bring every academic related stuff in one app.
                            You can manage everything related to your academic stuff. Currently we all use some social
                            platform to handle academy related stuff. And we all know that this is not healthy for us.
                            Some of us get addicted to social media and also it create social dilemma.
                            So, we decided to being a good alternative of social media to you to prevent this social
                            dilemma.
                            <br /><br />
                            What you will get-
                            <ul>
                                <li>You can see all type of notification related to your academics.</li>
                                <li>You can see all type of resource/link in your course page.</li>
                                <li>You can manage your assignment and class schedule.</li>
                                <li>You can make topic wise discussion.</li>
                                <li>You can see a good looking Feed to see what going on in your academic fields.</li>
                            </ul>

                            To explore more, download and install ClassTant.
                        </p>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <h4 className="pt-5 pl-5 pr-5 text-center">! ATTENTION !</h4>
                        <p className="pb-5 pl-5 pr-5 text-justify">
                            <Card style={{ color: "white", background: "red", padding: 10, margin: 2, textAlign: "center" }}>
                                Web of Classtant is under development.
                            </Card>
                            <Card style={{ color: "white", background: "red", padding: 10, margin: 2, textAlign: "center" }}>
                                To use all the feature download it from Play Store.
                            </Card>
                            <Card style={{ color: "white", background: "red", padding: 10, margin: 2, textAlign: "center" }}>
                                Both teacher and student version is available in android platfrom
                            </Card>
                            <p>This is Incomplete till now. For urgent demand, we are providing some feature for teachers
                                only. </p>
                        </p>
                    </Col>
                </Row>

            </Fragment>
        );
    }
}

export default SignIn;