import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Redirect } from 'react-router';
import firebase from 'firebase';

const { Header } = Layout;


class Headers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectPage: '',
      isSignedIn: false,
    };
  }



  clickedMyoffers = () => {
    this.setState({
      redirectPage: <Redirect to={{ pathname: '/user/myoffers' }} />
    })
  }

  clickedBrowseOffers = () => {
    this.setState({
      redirectPage: <Redirect to={{ pathname: '/user/browseoffers' }} />
    })
  }


  clickedCounterOffers = () => {
    this.setState({
      redirectPage: <Redirect to={{ pathname: '/offer/details' }} />
    })
  }

  clickedMatchingOffers = () => {
    this.setState({
      redirectPage: <Redirect to={{ pathname: '/user/moffers' }} />
    })
  }

  clickedPostOffers = () => {
    this.setState({
        redirectPage: <Redirect to={{ pathname: '/user/postoffer' }} />
      })
  }

  clickedShowRates = () => {
    this.setState({
        redirectPage: <Redirect to={{ pathname: '/user/rates' }} />
      })
  }

  clickedCreateAccount = () => {
    this.setState({
        redirectPage: <Redirect to={{ pathname: '/user/createAccount' }} />
      })

  }

  clickedTransactions = (e) => {
    this.setState({
      redirectPage: <Redirect to={{ pathname: '/user/transactions' }} />
    })
  }

  clickedTransactionsHistory = (e) => {
    this.setState({
      redirectPage: <Redirect to={{ pathname: '/user/transHistory' }} />
    })
  }

  clickedReports = (e) => {
    this.setState({
      redirectPage: <Redirect to={{ pathname: '/user/reports' }} />
    })
  }

  logoutHandler = () => {
    firebase.auth().signOut();
     this.setState({
       redirectPage: <Redirect to={{ pathname: '/' }} />
     })
  }
  componentDidMount() {
    // this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
    //   (user) => this.setState({ isSignedIn: !!user })
    // );
  }

  render() {
    return (
      <div>
        {this.state.redirectPage}
        
        <Header>
          <div />

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.props.selectedKey}
            style={{ lineHeight: '64px' }}
          >
            
            <Menu.Item key="1" onClick={this.clickedMyoffers}>My Offers</Menu.Item> 
            <Menu.Item key="2" onClick={this.clickedBrowseOffers}>Browse Offers</Menu.Item> 
            <Menu.Item key="3" onClick={this.clickedCounterOffers}>Counter Offers</Menu.Item> 
            {/* <Menu.Item key="4" onClick={this.clickedMatchingOffers}>Matching Offers</Menu.Item>  */}
            <Menu.Item key="5" onClick={this.clickedPostOffers}>Post Offers</Menu.Item> 
            <Menu.Item key="6" onClick={this.clickedShowRates}>Exchange Rates</Menu.Item> 
            <Menu.Item key="7" onClick={this.clickedCreateAccount}>Create Bank Account</Menu.Item> 
            <Menu.Item key="8" onClick={this.clickedTransactions}>Transactions</Menu.Item> 
            <Menu.Item key="9" onClick={this.clickedTransactionsHistory}>Transaction History</Menu.Item> 
            <Menu.Item key="10" onClick={this.clickedReports}>System Reports</Menu.Item> 


            {this.state.isSignedIn &&
              <Menu.Item key="8" style={{ float: "right" }} onClick={this.logoutHandler}>Logout</Menu.Item>
            }
          </Menu>
        </Header>
      </div>
    )
  }



}

export default Headers;