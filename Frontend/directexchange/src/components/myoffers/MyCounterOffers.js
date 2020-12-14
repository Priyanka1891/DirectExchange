import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import { Button, Card, Divider, Layout, Menu, Breadcrumb, Space, Row, Col } from 'antd';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserHeader from '../userHeader';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};


class MyCounterOffers extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    onSelectCard = (e) => {
        console.log('button', e);
        var selectedOffer = this.state.offers.find(obj => {
            return obj.id === e;
        })
        this.setState({
            selectedOffer: selectedOffer
        });

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
            <div>
                <div>
                    <UserHeader selectedKey={['11']} />
                </div>
                <Content style={{ padding: '0 50px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={300}>
                            <Card title="My Counter Offers" >
                                {this.state.offers && this.state.offers.map((value, index) => {
                                    return <Card.Grid bordered={true} style={gridStyle}>
                                        <p><b>Offer ID : {value.id}
                                            <Divider type="vertical" /></b>
                                            Offer Status : {value.offerStatus}
                                        </p>
                                        <Divider />
                                        <p><b>Amount</b> : {value.amountToRemitSourceCurrency}</p>
                                        <p><b>Exchange Rate</b> : {value.exchangeRate}</p>
                                        <Button type="dashed" onClick={this.onSelectCard.bind(this, value.id)}>Counter Offers</Button>
                                    </Card.Grid>
                                })}

                            </Card>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Card title="Offer Details" extra={<a href="#">More</a>} >

                                {this.state.selectedOffer != undefined &&
                                    <>
                                        <Row gutter={[16, 24]}>
                                            <Col className="gutter-row" span={6}>
                                                <div> Offer ID : {this.state.selectedOffer.id}</div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div>Offer Status : {this.state.selectedOffer.offerStatus}</div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div>Amount : {this.state.selectedOffer.amountToRemitSourceCurrency}</div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div>Exchange Rate: {this.state.selectedOffer.exchangeRate}</div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div>Source Country : {this.state.selectedOffer.sourceCountry}</div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div>Destination Country : {this.state.selectedOffer.destinationCountry}</div>

                                            </Col><Col className="gutter-row" span={6}>

                                                <div>Destination Currency : {this.state.selectedOffer.destinationCurrency}</div>
                                            </Col><Col className="gutter-row" span={6}>
                                                <div>Counter Offer Allowed? : {this.state.selectedOffer.allowCounterOffers}</div>
                                            </Col><Col className="gutter-row" span={6}>
                                                <div>Split Allowed? : {this.state.selectedOffer.allowSplitExchanges}</div>
                                            </Col><Col className="gutter-row" span={6}>
                                                <div> Expiration Date : {this.state.selectedOffer.expirationDate}</div>
                                            </Col><Col className="gutter-row" span={6}>

                                                <div>Bank : {this.state.selectedOffer.receivingBankName}</div>
                                            </Col>
                                            {/* <Divider orientation="left">User Details</Divider>
                                        {this.state.selectedOffer.user.name}<Divider type="vertical" /> {this.state.selectedOffer.user.userName} */}

                                        </Row>

                                    </>
                                }
                            </Card>
                            <Card>



                                {this.state.selectedOffer != undefined && this.state.selectedOffer && this.state.selectedOffer.proposedOffers.map((value, index) => {
                                    return <>
                                        <Card.Grid bordered={true} style={gridStyle}>
                                            <p><b>Offer ID : {value.id}
                                                <Divider type="vertical" /></b>
                        Offer Status : {value.status}
                                            </p>
                                    <Divider />
                                        <p><b>User 1 Split Amount</b> : {value.splitUser1Amount}</p>
                                        <p><b>User 2 Split Amount</b> : {value.splitUser2Amount}</p>

                                        <p><b>Exchange Rate</b> : {value.exchangeRate}</p>
                                        <Divider />
                                </Card.Grid>
                                </>
                        })}

                    </Card>

                        </Content>
                    </Layout>
                </Content>

            </div>

        )
    }
}
export default MyCounterOffers;