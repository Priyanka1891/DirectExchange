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

const initialState = {
    isSignedIn: false,
    redirectPage: '',
    showError: false,
};

class Login extends Component {
    constructor() {
        super();
        this.state = initialState;
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
  

    render() {
        if (!this.state.isSignedIn) {
            return (
                <div>
                    <div>
                        <Headers selectedKey={['3']} />
                    </div>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                    <div>
                        <Footer />
                    </div>

                </div>
            );
        }
        return (
            <div>
                <div>
                    <Headers selectedKey={['3']} />
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

export default Login;