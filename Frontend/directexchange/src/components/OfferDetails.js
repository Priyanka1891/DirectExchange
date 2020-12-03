import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import { Button, Card, Divider, Pagination, Modal, Input, Form } from 'antd';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { MailOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";


const gridStyle = {
    width: '25%',
    textAlign: 'center',
};


class OfferDetails extends React.Component {


    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {

        console.log('this.state', this.props.location.state);
        if (this.props.location.state) {
            this.setState({ offerDetails: this.props.location.state });
        }
    }

    onAcceptClick = (e) => {
        //Show modal
        this.setState({ showModal: true });
    }

    closeModal = (e) => {
        //Show modal
        this.setState({ showModal: false });
    }
    acceptOfferHandler = (e) => {

        console.log('Insideacceptoffer');
        var data = {
            "userName": localStorage.getItem('userName'),
            "amount": this.state.offerDetails.amountToRemitSourceCurrency,
            "percentOfTotalAmount": 5,
            "exchangeOfferId": this.state.offerDetails.id
        }
        axios
            .put("http://localhost:8080" + "/exchangeOffer/updateOfferStatusToInTransaction/", data)
            .then(response => {
                console.log("Search Result : ", response.data);
                if (response.data != undefined) {
                    this.setState({
                        offers: response.data,
                        showModal: false
                    });
                    //Redirect to transaction page



                    this.props.history.push({
                        pathname: '/transactionDetails',
                        data: response.data // your data array of objects
                    })
                } else {

                }

            })
            .catch(errors => {
                console.log("Error" + errors);
            });
    }

    counterOfferHandler = (e) => {
        console.log('Insideacceptoffer');
        var data = {
            "splitUserId1": this.state.offerDetails.user.userName,
            "splitUserId2": null,
            "splitUser1Amount": this.state.offerDetails.amountToRemitSourceCurrency,
            "splitUser2Amount": 0,
            "exchangeOfferId": this.state.offerDetails.id,
            "amount": this.state.offerDetails.amountToRemitSourceCurrency
        }

        axios
            .post("http://localhost:8080" + "/exchangeOffer/updateOfferStatusForCounterOffer", data)
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
                {this.state.offerDetails &&
                    <>
                        <Card style={{ width: "30%" }} title="Offer Details">
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
                        <Button type="primary" onClick={this.onAcceptClick} >Accept</Button> <Divider type="vertical"> </Divider>
                        {/* <Button Disabled type="primary">Reject</Button> */}
                        <Button type="primary" onClick={this.counterOfferHandler}>Counter</Button>
                        </Card>

                    <Modal
                        title="Provide Bank Details"
                        style={{ top: 20, width: "450px" }}
                        visible={this.state.showModal}
                        onOk={() => this.acceptOfferHandler()}
                        onCancel={() => this.closeModal()}
                    >
                        <Form.Item
                            label="Account Number"
                            name="username"
                            rules={[{ required: true, message: 'Please input your account number!' }]}
                        >
                            <Input type="text" />
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            label="Routing Number"
                            name="username"
                            rules={[{ required: true, message: 'Please input your routing number!' }]}
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Modal>
                </>
                }
            </>
        )
    }
}
export default OfferDetails;