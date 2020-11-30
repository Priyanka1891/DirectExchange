import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import { Button, Card } from 'antd';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};


class MyOffers extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {

        axios
            .get("http://localhost:8080" + "/exchangeOffer/getOffers/" + localStorage.getItem('userName'))
            .then(response => {
                console.log("Search Result : ", response.data);
                if (response.data != undefined) {
                    this.setState({
                        offers: response.data
                    });
                } else {

                }

            })
            .catch(errors => {
                console.log("Error" + errors);
            });
    }

    render() {
        return (
            <Card title="My Offers">
                {this.state.offers && this.state.offers.map((value, index) => {
                    return <Card.Grid bordered={true} style={gridStyle} extra={<a>{value.offerStatus}</a>}>
                        <p>{value.allowCounterOffers}</p>
                        <p>{value.allowSplitExchanges}</p>
                        <p>{value.amountToRemitSourceCurrency}</p>
                        <p>{value.destinationCountry}</p>
                        <p>{value.destinationCurrency}</p>
                        <p>{value.exchangeRate}</p>
                        <p>{value.expirationDate}</p>
                        <p>{value.id}</p>
                        <p>{value.offerStatus}</p>
                        <p>{value.receivingAccountNumber}</p>
                        <p>{value.sourceCountry}</p>
                        <p>{value.sourceCurrency}</p>
                        <p>{value.receivingBankName}</p>

                        <Link to={'matchingoffers/' + value.id}>
                            <Button type="primary">Find Matching Offers</Button>
                        </Link>
                    </Card.Grid>
                })}

            </Card>
        )
    }
}
export default MyOffers;