import React, {Component, Fragment} from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2'
import TopCardContent from '../component/topContent/TopCardContent'
import firebase, {auth} from "../firebase";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (await sessionStorage.getItem("classtantUser") === null) {
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
    }

    validation() {
        if(auth.currentUser.uid === null){
            alert("Something went wrong! Log out and Sign In again.")
            return false;
        }
        else if(auth.currentUser.uid === undefined){
            alert("Something went wrong! Log out and Sign In again.")
            return false;
        }
        else
            return true
    }

    render() {
        return (
            <Fragment>
                <TopNavigation2/>
                <br/><br/><br/><br/>
                <TopCardContent/>
            </Fragment>
        )
    }
}
