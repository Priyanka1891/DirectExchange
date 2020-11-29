import React, { Component } from 'react';
import Headers from './Header';
import Footer from './Footer';
import { Redirect } from 'react-router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
     // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,  
    ],
};

const initialState = {
    isSignedIn: false,
    redirectPage: '',
    showError: false,
    emailVerificationSent: true
};

var actionCodeSettings = {
    url: 'http://localhost:3000/'
};

class Register extends Component {
    constructor() {
        super();
        this.state = initialState;
        this.sendEmailVerification = this.sendEmailVerification.bind(this);
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }
  

    sendEmailVerification = () => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification(actionCodeSettings).then(function() {
            console.log("Sent email")
        }).catch(function(error) {
            console.log(error)
        });
    }

    noop = () => {}

    render() {
        if (!this.state.isSignedIn) {
            return (
                <div>
                    <div>
                        <Headers selectedKey={['2']} />
                    </div>
                    <div style={{ marginLeft: "50%", marginTop: "10%" }}>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                    <div>
                        <Footer />
                    </div>

                </div>
            );
        }
        { this.state.emailVerificationSent ? this.noop() : this.sendEmailVerification() };
        // TODO: after this redirect to some modal window giving msg that
        //  verify  email id. once user clicks verification link, user will be
        // directed to home page. 
        return (
            <div>
                <div>
                    <Headers selectedKey={['2']} />
                </div>
                <h1>My Home</h1>
                <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Register;