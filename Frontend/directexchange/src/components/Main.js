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

import TransctionHistory from './reports/transactionHistory';
import SystemReport from './reports/systemReport';

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
          <Route exact path="/" component={LoginForm} />
        }

        {/* If user is logged in */}
        {this.state.isSignedIn &&
          <>
          <Route exact path="/" component={Headers} />
          <Route exact path="/" component={MyOffers} />

          <Route path="/user/myoffers/" component={MyOffers} />
          <Route path="/user/moffers/" component={MatchingOffers} />


            <Route path="/user/rates/" component={Rates} />
            <Route path="/user/createaccount/" component={CreateAccount} />
            <Route path="/user/postoffer/" component={PostOffer} />
          </>
        }
            <Route path="/user/rates/" component={Rates} />
            <Route path="/user/postoffer/" component={PostOffer} />

            <Route path="/user/createaccount/" component={CreateAccount} />

        <Route path="/user/moffers/" component={MatchingOffers} />
        <Route path="/user/transactions/" component={TransctionHistory} />
        <Route path="/user/systemreport/" component={SystemReport} />





      </div>
    );
  }
}

// Export The Main Component
export default Main;