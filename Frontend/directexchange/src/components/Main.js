import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import LoginForm from './Login';
import Rates from './rates';


//import users components
import CreateAccount from './users/CreateAccount';
import PostOffer from './users/PostOffer';
import MyOffers from './myoffers/MyOffers';
import Headers from './Header';
import MatchingOffers from './myoffers/MatchingOffers';
import BrowseOffers from './BrowseOffers';
import OfferDetails from './OfferDetails';
//import TransactionDetails from './TransactionDetails';
import TransactionDetails from './transaction/transaction';


// Main Component
const initialState = {
  userName : null
};

class Main extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount = () => {
    this.setState({
      userName: localStorage.getItem("userName")
    })
  }

  render() {
    if (!this.state.userName) {
      return (<Route exact path="/" component={LoginForm} key={Date.now()}/>);
    }

    return (
      <div>
          <>
          <Route path="/user/myoffers/" component={MyOffers} />
          <Route path="/user/moffers/" component={MatchingOffers} />
          <Route path="/user/browseoffers/" component={BrowseOffers} />
          <Route path="/offer/details" component={OfferDetails} />
          <Route exact path="/" component={BrowseOffers} key={Date.now()} />

          <Route path="/user/rates/" component={Rates} />
          <Route path="/user/createaccount/" component={CreateAccount} />
          <Route path="/user/postoffer/" component={PostOffer} />
          <Route path="/offer/transaction/" component={TransactionDetails} />
          </>






      </div>
    );
  }
}

// Export The Main Component
export default Main;
