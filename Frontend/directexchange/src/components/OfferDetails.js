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


class OfferDetails extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {

        console.log('this.state', this.props.location.state);
        if (this.props.location.state) {
            this.setState({ offerDetails: this.props.location.state });
        }
    }


    render() {
        return (
            <>
                {this.state.offerDetails &&
                    <Card title="Offer Details">
                        <p><b>Offer ID : {this.state.offerDetails.id}
                            <Divider type="vertical" /></b>
                        Offer Status : {this.state.offerDetails.offerStatus}
                        </p>
                        <Divider />
                        <p><b>Amount</b> : {this.state.offerDetails.amountToRemitSourceCurrency}</p>
                        <p><b>Exchange Rate</b> : {this.state.offerDetails.exchangeRate}</p>
                        <Divider />
                        <p>Source Country : {this.state.offerDetails.sourceCountry}</p>
                        <p>Destination Country : {this.state.offerDetails.destinationCountry}</p>
                        <p>Destination Currency : {this.state.offerDetails.destinationCurrency}</p>
                        <Divider />
                        <p>Counter Offer Allowed? : {this.state.offerDetails.allowCounterOffers}</p>
                        <p>Split Allowed? : {this.state.offerDetails.allowSplitExchanges}</p>
                        <p>Expiration Date : {this.state.offerDetails.expirationDate}</p>

                        {/* <p>{this.state.offerDetails.receivingAccountNumber}</p> */}
                        <p>Bank : {this.state.offerDetails.receivingBankName}</p>
                        <Divider orientation="left">User Details</Divider>
                        <p>{this.state.offerDetails.user.name}<Divider type="vertical" /> <MailOutlined /> {this.state.offerDetails.user.userName}</p>
                        <Divider dashed />
                        <Button type="primary">Accept</Button> <Divider type="vertical"> </Divider> <Button type="primary">Reject</Button>
                        <Button type="primary">Counter</Button>
                    </Card>
                }
                <Pagination defaultCurrent={1} total={50} />
            </>
        )
    }
}
export default OfferDetails;