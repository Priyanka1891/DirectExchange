import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import { Input, Row, Col, Button, Card, Divider, Pagination, Form, Select } from 'antd';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { MailOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;


const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

const style = { background: '#0092ff', padding: '8px 0' };


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

    onSourceCurrencyChange = (e) => {
        if (e) {
            this.setState({
                sourcecurrency: e.toUpperCase()
            }, () => {
                this.getExchangeRate();
            })
        }
        else {
            this.setState({
                sourcecurrency: ''
            }, () => {
                this.getExchangeRate();
            })
        }

    }

    onChange = (e) => {
    }
    onDestinationCurrencyChange = (e) => {
        if (e) {
            this.setState({
                destinationcurrency: e.toUpperCase()
            }, () => {
                this.getExchangeRate();
            })
        }
        else {
            this.setState({
                destinationcurrency: ''
            }, () => {
                this.getExchangeRate();
            })
        }

    }

    render() {
        return (
            <>
                <Card title="Browse Offers">

                    <Row gutter={{ xs: 8, xs: 8 }}>
                        <Col className="gutter-row" span={4}>
                            <Form.Item
                                name="sourcecurrency"
                                label="Source Currency"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select onChange={this.onSourceCurrencyChange}>
                                    <Option value="EUR">EUR</Option>
                                    <Option value="GBP">GBP</Option>
                                    <Option value="INR">INR</Option>
                                    <Option value="RMB">RMB</Option>
                                    <Option value="USD">USD</Option>
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Form.Item
                                name="destinationcurrency"
                                label="Destination Currency"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select onChange={this.onDestinationCurrencyChange}>
                                    <Option value="EUR">EUR</Option>
                                    <Option value="GBP">GBP</Option>
                                    <Option value="INR">INR</Option>
                                    <Option value="RMB">RMB</Option>
                                    <Option value="USD">USD</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>





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
                                <p>{value.user.name}<Divider type="vertical" /> <MailOutlined /> Ratings </p>
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