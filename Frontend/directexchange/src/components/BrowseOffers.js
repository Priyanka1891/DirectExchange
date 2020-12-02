import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import { Button, Card, Divider, Pagination } from 'antd';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { MailOutlined } from '@ant-design/icons';



const gridStyle = {
    width: '25%',
    textAlign: 'center',
};


class BrowseOffers extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {

        axios
            .get("http://localhost:8080" + "/exchangeOffer/getAllActiveOffers/" + localStorage.getItem('userName'))
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
            <>
                <Card title="Browse Offers">
                    {this.state.offers && this.state.offers.map((value, index) => {
                        return <>
                            <Card.Grid bordered={true} style={gridStyle}>
                                <p><b>Offer ID : {value.id}
                                    <Divider type="vertical" /></b>
                        Offer Status : {value.offerStatus}
                                </p>
                                <Divider />
                                <p><b>Amount</b> : {value.amountToRemitSourceCurrency}</p>
                                <p><b>Exchange Rate</b> : {value.exchangeRate}</p>
                                <Divider />
                                <p>Source Country : {value.sourceCountry}</p>
                                <p>Destination Country : {value.destinationCountry}</p>
                                <p>Destination Currency : {value.destinationCurrency}</p>
                                <Divider />
                                <p>Counter Offer Allowed? : {value.allowCounterOffers}</p>
                                <p>Split Allowed? : {value.allowSplitExchanges}</p>
                                <p>Expiration Date : {value.expirationDate}</p>

                                {/* <p>{value.receivingAccountNumber}</p> */}
                                <p>Bank : {value.receivingBankName}</p>
                                <Divider orientation="left">User Details</Divider>
                                <p>{value.user.name}<Divider type="vertical" /> <MailOutlined /> {value.user.userName}</p>
                                <Divider dashed />
                                <Link to={{
                                    pathname: 'offer/details/',
                                    state: value
                                }}>
                                    <Button type="primary">Show Offer Details</Button>
                                </Link>
                            </Card.Grid>
                        </>
                    })}

                </Card>
                <Pagination defaultCurrent={1} total={50} />
            </>
        )
    }
}
export default BrowseOffers;