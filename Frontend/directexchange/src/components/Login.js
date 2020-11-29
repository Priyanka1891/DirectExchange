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
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
};

var actionCodeSettings = {
    url: 'http://localhost:3000/'
};

const initialState = {
    isSignedIn: false,
    redirectPage: '',
    showError: false,
    emailVerificationSent: false
};

class Login extends Component {
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
  
    noop = () => { }
    sendEmailVerification = () => {

        if (!this.state.emailVerificationSent) {
            return;
        }
        var user = firebase.auth().currentUser;
        user.sendEmailVerification(actionCodeSettings).then(function () {
            console.log("Sent email");
            this.setState({
                emailVerificationSent: true
            });
        }).catch(function (error) {
            console.log(error)
        });
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
                <div>
                    <div>
                        <Headers selectedKey={['3']} />
                    </div>
                    <div style={{ marginLeft: "50%", marginTop: "7%" }}>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                    <div>
                        <Footer />
                    </div>

                </div>
            );
        }
        { this.sendEmailVerification() };
        if (this.state.emailVerificationSent || this.state.isSignedIn) {
            return (
                <div>
                    <div>
                        <Headers />
                    </div>
                    <h1>Verification Link Sent</h1>
                    <p>Please verify your email address</p>
                    <div>
                        <Footer />
                    </div>
                </div>
            );
        }
    }
}

export default Login;