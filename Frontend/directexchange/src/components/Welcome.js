import React, { Component } from 'react';
import Footer from './Footer';
import Headers from './Header';
import { Layout, Row, Col } from 'antd';


const { Content } = Layout;


class WelcomePage extends Component {
    constructor() {
        super();
        this.state = {
            redirect: ''
        };
    }

    componentDidMount() {
        
    }


    render() {

        return (
            <div>
                {this.state.redirect}
                <div>
                    <Row >
                        <Layout className="layout">

                            <Content>
                                <div style={{ background: '#fff' }}>
                                    <br></br>
                                    <Row>
                                        <Col span={14}>
                                            {/* <img src={require('../images/rentcar.jpg')} style={{ maxWidth: '100%', minHeight: '100%', maxHeight: '50%' }} /> */}
                                        </Col>

                                        <Col span={2}></Col>
                                        <Col span={6}>
                                            <h1>Welcome to Direct exchange</h1>

                                        </Col>
                                    </Row>
                                    <Row>

                                    </Row>
                                </div>

                            </Content>

                        </Layout>
                    </Row>
                </div>
            </div>
        );
    }
}

export default WelcomePage;