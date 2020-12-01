import React, { Component, Fragment, useState } from "react";

import { Button, Card, Checkbox, Input, Row, Col } from 'antd';


const gridStyle = {
    width: '50%',
    textAlign: 'center',
};

class OfferCardSplit extends React.Component {

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

    render(){
        return(
            <Card.Grid bordered={true} style={gridStyle} extra={<a>{this.state.offerStatus}</a>}>
                                  <p>Counter Offer Allowed: <strong>{this.state.allowCounterOffers}</strong></p>
                                  <p>Amount to Remit: <strong>{this.state.amountToRemitSourceCurrency}</strong></p>
                                  <p>Destination Country: <strong>{this.state.destinationCountry}</strong></p>
                                  <p>Destination Currency: <strong>{this.state.destinationCurrency}</strong></p>
                                  {/* <p>{value.exchangeRate}</p> */}
                                  <p>Expiry Date: <strong>{this.state.expirationDate}</strong></p>
                                  {/* <p>{value.id}</p> */}
                                  <p>Status Of Offer: <strong>{this.state.offerStatus}</strong></p>
                                  {/* <p>{value.receivingAccountNumber}</p> */}
                                  <p>Source Country: <strong>{this.state.sourceCountry}</strong></p>
                                  <p>Source Currency: <strong>{this.state.sourceCurrency}</strong></p>
                                  {/* <p>{value.receivingBankName}</p> */}
                                 
                                 </Card.Grid>
                                
                                 
        );
    }





}


export default OfferCardSplit;
