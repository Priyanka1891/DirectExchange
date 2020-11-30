import React from 'react';
import { Route } from 'react-router-dom';
import WelcomePage from './Welcome';
import LoginForm from './Login';
import RegistrationForm from './Register';
import firebase from 'firebase';
import Rates from './rates';


//import users components
import CreateAccount from './users/CreateAccount';
import PostOffer from './users/PostOffer';


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
        <Route path="/" component={WelcomePage} />
        {/* <Route exact path="/" component={LoginForm} /> */}

        {/* <Route path="/login/" component={LoginForm} />
        <Route path="/register/" component={RegistrationForm} /> */}

        <Route path="/user/rates/" component={Rates} />
        <Route path="/user/createaccount/" component={CreateAccount} />
        <Route path="/user/postoffer/" component={PostOffer} />

      </div>
    );
  }
}

// Export The Main Component
export default Main;