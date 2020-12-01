import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './Login';
import firebase from 'firebase';
import Rates from './rates';

//import users components
import CreateAccount from './users/CreateAccount';
import PostOffer from './users/PostOffer';
import MyOffers from './myoffers/MyOffers';
import Headers from './Header';
import MatchingOffers from './myoffers/MatchingOffers';

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

    this.setState({
      isSignedIn:true
    })
  }

  render() {
    return (
      <div>
        {/* If user is not logged in */}
        {!this.state.isSignedIn &&
          <Route path="/" component={LoginForm} />
        }

        {/* If user is logged in */}
        {this.state.isSignedIn &&
          <>
          <Route path="/" component={Headers} />
          <Route exact path="/" component={MyOffers} />

          <Route path="/user/myoffers/" component={MyOffers} />
          <Route path="/user/moffers/" component={MatchingOffers} />


            <Route path="/user/rates/" component={Rates} />
            <Route path="/user/createaccount/" component={CreateAccount} />
            <Route path="/user/postoffer/" component={PostOffer} />
          </>
        }

        <Route path="/user/moffers/" component={MatchingOffers} />



      </div>
    );
  }
}

// Export The Main Component
export default Main;