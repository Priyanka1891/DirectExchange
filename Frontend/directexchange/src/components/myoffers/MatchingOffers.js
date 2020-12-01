import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import { Button, Card, Checkbox, Input, Row, Col } from 'antd';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import OfferCard from './offerCard';
//import OfferCardSplit from './OfferCardSplit';
import SplitMatchFirst from "./splitMatchFirst";

const gridStyle = {
    width: '30%',
    textAlign: 'center',
};


class MatchingOffers extends React.Component {

    constructor() {
        super();
        this.state = {
            singleMatches:[],
            splitMatches:[],
            showSplitMatches:true,
            loaded:false,
            showAcceptOffer:false,
            amountToRemit:2,
            proposedOffer:'',
        }
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {

        console.log(this.props.location.state);

        //api call to get single matches
        //api call to get split matches

       

        let data = [
            {
                "id": 7,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 75000.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 13,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 75099.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 12,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 74900.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 11,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 74200.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 9,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 73000.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 7,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 75000.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 13,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 75099.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 12,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 74900.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 11,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 74200.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Allow",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            },
            {
                "id": 9,
                "sourceCountry": "India",
                "sourceCurrency": "INR",
                "amountToRemitSourceCurrency": 73000.0,
                "destinationCountry": "US",
                "destinationCurrency": "USD",
                "exchangeRate": 0.013,
                "expirationDate": "2020-11-30",
                "allowCounterOffers": "Deny",
                "allowSplitExchanges": "Allow",
                "receivingBankName": "US Bank",
                "receivingAccountNumber": 1000000234789,
                "offerStatus": "Open"
            }
        ]

        let splitData = [
            [
                {
                    "id": 16,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 40000.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
                {
                    "id": 17,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 34840.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                }
            ],
            [
                {
                    "id": 15,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 36000.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
                {
                    "id": 16,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 36000.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
            ],
            [
                {
                    "id": 18,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 50000.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
                {
                    "id": 20,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 26070.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                }
            ],
            [
                {
                    "id": 19,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 50000.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
                {
                    "id": 20,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 50000.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
            ],
            [
                {
                    "id": 14,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 37222.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
                {
                    "id": 15,
                    "sourceCountry": "India",
                    "sourceCurrency": "INR",
                    "amountToRemitSourceCurrency": 37222.0,
                    "destinationCountry": "US",
                    "destinationCurrency": "USD",
                    "exchangeRate": 0.013,
                    "expirationDate": "2020-11-30",
                    "allowCounterOffers": "Allow",
                    "allowSplitExchanges": "Allow",
                    "receivingBankName": "US Bank",
                    "receivingAccountNumber": 1000000234789,
                    "offerStatus": "Open"
                },
                
            ],
            
        ]

        this.setState({
            singleMatches:data,
            splitMatches:splitData
        }, ()=>{
            this.setState({
                loaded:true
            })
        })
    }

    onChange = (e) => {
        console.log(e.target.checked)
        if(e.target.checked){
           this.setState({
               showSplitMatches:true
           })
        }
        else{
            this.setState({
                showSplitMatches:false
            })
        }

    }

    checkExactPriceMatch = (value, e) => {
        return false;
    }

    counterOfferClicked = (value, e) => {
        console.log(value)
        console.log(e)



    }

    

    render() {
        return (
            <div>
             {this.state.loaded &&   <div>
                <Checkbox onChange={this.onChange} checked={this.state.showSplitMatches}>Show Split Matches</Checkbox>
             <div>
                    {/* <h1>Below are your single matches:</h1> */}
                    <Card title="Auto Matching Offers">
                    {this.state.singleMatches.map((value, ind)=>{
                        return (
                            <div>
                                 <OfferCard value={value} userAmountToRemit={this.state.amountToRemit}></OfferCard>
                            </div>
                        );
                    })}
                                   </Card>

            </div>
            <br></br>
            <br></br>
            <div>
                {this.state.showSplitMatches && <div>
                    {this.state.splitMatches.length && this.state.splitMatches.map((offer, ind)=>{
                        return (
                            <SplitMatchFirst key={ind} offers = {offer} amountToRemit={this.state.amountToRemit}></SplitMatchFirst>
                        );
                    })}
            </div>}
            </div>
            
            </div>
    }
            </div>
        )
    }
}
export default MatchingOffers;