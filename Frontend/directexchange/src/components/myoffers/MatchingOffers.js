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


class MatchingOffers extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {

        console.log(this.props.location.state);
    }

    render() {
        return (
            <Card title="My Offers">


            </Card>
        )
    }
}
export default MatchingOffers;