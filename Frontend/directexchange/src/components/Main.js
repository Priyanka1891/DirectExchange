import React from 'react';
import { Route } from 'react-router-dom';
import WelcomePage from './Welcome';
import LoginForm from './Login';
import RegistrationForm from './Register';
import firebase from 'firebase';
// Main Component
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectPage: '',
      isSignedIn: false,
    };

  }
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  render() {
    return (
      <div>
        {/* If user is not logged in */}
        {!this.state.isSignedIn &&
          <Route path="/" component={LoginForm} />
        }

        {/* If user is logged in */}
        <Route path="/welcome/" component={WelcomePage} />
        <Route exact path="/" component={LoginForm} />

        {/* <Route path="/login/" component={LoginForm} />
        <Route path="/register/" component={RegistrationForm} /> */}

      </div>
    );
  }
}

// Export The Main Component
export default Main;