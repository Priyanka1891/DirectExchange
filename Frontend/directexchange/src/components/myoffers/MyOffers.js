import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import { Card } from 'antd';
import firebase from 'firebase';


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
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        )
    }
}
export default MyOffers;