import React, { Component, Fragment, useState } from "react";

import { Button, Card, message, Input, Row, Col } from 'antd';
import {    Link
} from "react-router-dom";
import axios from 'axios';
import {urlConfig} from '../../config/config';

import { Redirect } from 'react-router';

const { TextArea } = Input;


const gridStyle = {
    width: '30%',
    textAlign: 'center',
};

const userName = localStorage.getItem('userName');
//const userName = "ambika@sjsu.edu";

class OfferCard extends React.Component {

    constructor(props){
        super(props)
        this.state={
            offerStatus: this.props.value.offerStatus,
            allowCounterOffers: this.props.value.allowCounterOffers,
            amountToRemitSourceCurrency: this.props.value.amountToRemitSourceCurrency,
            destinationCountry: this.props.value.destinationCountry,
            destinationCurrency:this.props.value.destinationCurrency,
            expirationDate:this.props.value.expirationDate,
            sourceCountry:this.props.value.sourceCountry,
            sourceCurrency:this.props.value.sourceCurrency,
            userAmountToRemit:this.props.userAmountToRemit,
            proposedOffer:'',
            message:'',

        }
    }

    changeProposedOffer = (e) => {
        console.log(e.target.value);
        this.setState({
            proposedOffer:e.target.value
        })
    }

    counterOfferClicked = (e) => {
        console.log(this.state.proposedOffer)

        //check if it lies within the range
    }

    sendMessage = (e) => {

        try{
        let object = {
            fromUser:userName,
            toUser:this.props.value.user.userName,
            message:this.state.message
        }

        axios
        .post(urlConfig.url + "/sendEmail", object)
        .then(response => {
            console.log("Search Result : ", response.data);
            if (response.data != undefined) {
                message.success('Successfully sent email to the user')
                this.setState({
                    message:''
                });
            } else {
                this.setState({
                    message:''
                });

            }

        })
        .catch(errors => {
            console.log("Error" + errors);
        });
    }
    catch(e){
        
    }
    }

    messageChange = (e) => {
        if(e){
            this.setState({
                message:e.target.value
            })
        }
        else{
            this.setState({
                message:''
            })
        }
    }

    acceptOfferClicked = (e) => {
        var object = {
            "userName": this.props.value.user?.userName,
            "amount": this.props.value.amountToRemitSourceCurrency,
            "percentOfTotalAmount": 5,
            "exchangeOfferId": this.props.value.id,
            "offer1":this.props.value.id,
           // "bankName": bankObj.bankName,
           // "accountNumber": bankObj.accountNumber,
        }
        axios
        .post(urlConfig.url + "/transaction/acceptoffer", object)
        .then(response => {
            console.log("Search Result : ", response.data);
            if (response.data != undefined) {
               
            } else {
                
            }

        })
        .catch(errors => {
            console.log("Error" + errors);
        });

        let secondObjest = {
            "userName": this.props.userLoggedIn.user?.userName,
            "amount": this.props.userLoggedIn.amountToRemitSourceCurrency,
            "percentOfTotalAmount": 5,
            "exchangeOfferId": this.props.value.id,
            "offer1":this.props.userLoggedIn.id,
        }

        axios
        .post(urlConfig.url + "/transaction/acceptoffer", secondObjest)
        .then(response => {
            console.log("Search Result : ", response.data);
            if (response.data != undefined) {
               
            } else {
                
            }

        })
        .catch(errors => {
            console.log("Error" + errors);
        });

        //send email for payment notification
        message.success('Go to Transactions and make the payment');
        <Redirect to={{ pathname: '/user/myoffers' }}></Redirect>

    }

    render(){
        console.log(this.props)
        return(
            <Card.Grid bordered={true} style={gridStyle} extra={<a>{this.state.offerStatus}</a>}>
                                  {/* <p>Counter Offer Allowed: <strong>{this.state.allowCounterOffers}</strong></p> */}
                                  <p>Amount to Remit: <strong>{this.state.amountToRemitSourceCurrency}</strong></p>
                                  <p>Destination Country: <strong>{this.state.destinationCountry}</strong></p>
                                  <p>Destination Currency: <strong>{this.state.destinationCurrency}</strong></p>
                                  {/* <p>{value.exchangeRate}</p> */}
                                  {/* <p>Expiry Date: <strong>{this.state.expirationDate}</strong></p> */}
                                  {/* <p>{value.id}</p> */}
                                  <p>Status Of Offer: <strong>{this.state.offerStatus}</strong></p>
                                  {/* <p>{value.receivingAccountNumber}</p> */}
                                  <p>Source Country: <strong>{this.state.sourceCountry}</strong></p>
                                  <p>Source Currency: <strong>{this.state.sourceCurrency}</strong></p>
                                  {/* <p>{value.receivingBankName}</p> */}
                                  <Row>
                                      <Col md={8}>

                                      </Col>
                                  {/* <Link to={{ pathname: 'user/details/', state: this.props.value }}>
                                   <Button type="primary">View User details</Button>
                                  </Link> */}
                                  </Row>
                                  <p></p>

                                  <Row>
                                      <Col md={14}>
                                      <TextArea onChange={this.messageChange} value={this.state.message} rows={4} />
                                      </Col>
                                      <Col md={10}>
                                   <Button type="primary" onClick={this.sendMessage} danger>Send Message</Button>
                                   </Col>
                                   </Row>
                                   <p></p>
                                   <Button type="primary" style={{background:'green'}} onClick={(e)=>this.acceptOfferClicked(e)}>Accept Offer</Button>
                                  <p></p>
                                  {/* <Row>
                                      <Col md={12}>
                                  <Input type="text" value={this.state.changeOffer} onChange={this.onChangeChangeOffer} disabled={this.state.amountToRemit === this.state.userAmountToRemit? true: false}></Input>
                                       </Col>
                                  <Col md={12}>

                                 <Button type="primary" disabled={this.state.amountToRemit === this.state.userAmountToRemit? true: false} onClick={(e)=>this.changeMyOfferClicked(e)} style={{background:'blue'}}>Change My Offer</Button>
                                 </Col>
                                 </Row> */}
                                 <p></p>
                                  <Row>
                                      <Col md={12}>
                                  <Input type="text" value={this.state.proposedOffer} onChange={this.changeProposedOffer} disabled={this.state.allowCounterOffers.toUpperCase() === "allow".toUpperCase()?false:true}></Input>
                                   </Col>
                                  <Col md={12}>

                                 <Button type="primary" disabled={this.state.allowCounterOffers.toUpperCase() === "allow".toUpperCase()?false:true} onClick={(e)=>this.counterOfferClicked(e)} danger>Propose Counter Offer</Button>
                                 </Col>
                                 </Row> 


                                  {/* <Button type="primary" style={{background:'green'}} disabled={this.state.amountToRemit === this.state.userAmountToRemit? false: true}>Accept Offer</Button>
                                  <p></p>
                                  <Row>
                                      <Col md={12}>
                                  <Input type="text" value={this.state.changeOffer} onChange={this.onChangeChangeOffer} disabled={this.state.amountToRemit === this.state.userAmountToRemit? true: false}></Input>
                                       </Col>
                                  <Col md={12}>

                                 <Button type="primary" disabled={this.state.amountToRemit === this.state.userAmountToRemit? true: false} onClick={(e)=>this.changeMyOfferClicked(e)} style={{background:'blue'}}>Change My Offer</Button>
                                 </Col>
                                 </Row>
                                 <p></p>
                                  <Row>
                                      <Col md={12}>
                                  <Input type="text" value={this.state.proposedOffer} onChange={this.changeProposedOffer} disabled={this.state.allowCounterOffers.toUpperCase() === "allow".toUpperCase()?false:true}></Input>
                                   </Col>
                                  <Col md={12}>

                                 <Button type="primary" disabled={this.state.allowCounterOffers.toUpperCase() === "allow".toUpperCase()?false:true} onClick={(e)=>this.counterOfferClicked(e)} danger>Propose Counter Offer</Button>
                                 </Col>
                                 </Row> */}
                                 </Card.Grid>
                                
                                 
        );
    }


}


export default OfferCard;
