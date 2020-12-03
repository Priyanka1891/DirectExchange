import React, { Component } from 'react';
import { Form, Input, Alert, Select, Button, Row, Col, DatePicker, InputNumber, Switch } from 'antd';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';
import {ratesTable} from '../../config/ratesInfo';
import UserHeader from '../userHeader';
import axios from 'axios';
import {urlConfig} from '../../config/config';

const { MonthPicker } = DatePicker;

const { Option } = Select;

//let username = localStorage.getItem('username');
const userName = "ambika@sjsu.edu";

class PostOffer extends Component{
    formRef = React.createRef();

    constructor() {
        super();
        this.state = {

            redirectPage: '',
            showError: false,
            showExchangeRate:true,
            exchangeRateValue:'',
            sourcecurrency:'',
            destcurrency:'',
        };
    }

    async componentDidMount() {

        //get query to check if user is eligible to post offer
     let res =   await axios
        .get(urlConfig + "/exchangeOffer/getOffers/" + localStorage.getItem('userName'))
        .then(response => {
            console.log("Search Result : ", response.data);
            if (response.data != undefined) {
                this.setState({
                });
            } else {

            }

        })
        .catch(errors => {
            console.log("Error" + errors);
        });

    }

  
    getExchangeRate = () => {
        for(let i = 0 ; i<ratesTable.length; i++){
            if(ratesTable[i]['fromcurrency'].toUpperCase() === this.state.sourcecurrency 
            && ratesTable[i]['tocurrency'].toUpperCase() === this.state.destcurrency){
                this.setState({
                    exchangeRateValue: ratesTable[i]['rate']
                })
            }
        }

    }

    onFinish = values => {

        values.userName = userName;
        values.offerStatus = "open";
        console.log(values);

        /*

        */

        axios
        .post(urlConfig + "/createExchangeOffer", values)
        .then(response => {
            console.log("Search Result : ", response.data);
            if (response.data != undefined) {
                Swal.fire('Success', 'Offer Posted', 'success');
              this.setState({
                redirectPage: <Redirect to={{ pathname: '/user/postoffer/' }} />
                })
            } else {

            }
            
        })
        .catch(errors => {
            console.log("Error" + errors);
        });
        

       /* if(!this.state.showExchangeRate){
            for(let i = 0 ; i<ratesTable.length; i++){
                if(ratesTable[i]['fromcurrency'].toUpperCase() === values.sourcecurrency 
                && ratesTable[i]['tocurrency'].toUpperCase() === values.destcurrency){
                    values.exchangeRate = ratesTable[i]['rate'];

                    
                }
            }
        }
*/
       
        console.log(values);
        //api call
       
        }; 

        
    disabledDate = (current) => {
        return current && current.valueOf() < Date.now();

    }

    onSourceCurrencyChange = (e) => {
        if(e){
            this.setState({
                sourcecurrency:e.toUpperCase()
            }, ()=> {
                this.getExchangeRate();
            })
        }
        else{
            this.setState({
                sourcecurrency:''
            }, () => {
                this.getExchangeRate();
            })
        }
        
    }

    onDestCurrencyChange = (e) => {
        if(e){
            this.setState({
                destcurrency:e.toUpperCase()
            }, () => {
                this.getExchangeRate();
            })
        }
        else{
            this.setState({
                destcurrency:''
            }, () => {
                this.getExchangeRate();
            })
        }
//        this.getExchangeRate();

    }

    render(){
        const frontFormLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 8,
            },
        };
        const tailFormLayout = {
            wrapperCol: {
                offset: 8,
                span: 12,
            },
        };

        return ( 
           <div>

        {this.state.redirectPage}
        <div>
<UserHeader selectedKey={['5']} />

</div>
                <div>
                    <Form
                        {...frontFormLayout}
                        ref={this.formRef}
                        name="post"
                        onFinish={this.onFinish}
                        scrollToFirstError
                        style={{ paddingTop: '1%', marginBottom:'15%', overflow:'scroll', position:'relative' }}
                        initialValues={{
                            ["exchangerate"]: this.state.exchangeRateValue,

                            ["splitexchange"]: '1',
                            ["counteroffers"]: '1' 

                          }}
                    >
                    
                        <Form.Item
                            name="sourceCountry"
                            label="Source Country"
                            rules={[
                                {
                                    required: true,
                                    message:'Please select country'
                                },
                            ]}
                        >
                            <Select

                                onChange={this.onStateChange}
                                
                            >
                                <Option value="usa">USA</Option>
                                <Option value="india">India</Option>
                                <Option value="china">China</Option>
                                <Option value="uk">UK</Option>
                                <Option value="australia">Australia</Option>
                                <Option value="germany">Germany</Option>
                                <Option value="spain">Spain</Option>
                                <Option value="finland">Finland</Option>
                                <Option value="italy">Italy</Option>
                                <Option value="france">France</Option>

                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="sourceCurrency"
                            label="Source Currency"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select

                                onChange={this.onSourceCurrencyChange}
                                
                            >
                                <Option value="EUR">EUR</Option>
                                <Option value="GBP">GBP</Option>
                                <Option value="INR">INR</Option>
                                <Option value="RMB">RMB</Option>
                                <Option value="USD">USD</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="amountToRemitSourceCurrency"
                            label="Amount to remit(source currency)"
                            rules={[
                                // {
                                //     required: true,
                                // }
                            ]}
                        >
                        <InputNumber min={0} style={{ width: '100%' }} />

                        </Form.Item>
                        <Form.Item
                            name="destinationCountry"
                            label="Destination Country"
                            rules={[
                                {
                                    required: true,
                                    message:'Please select country'
                                },
                            ]}
                        >
                            <Select

                                onChange={this.onStateChange}
                                allowClear
                            >
                               <Option value="usa">USA</Option>
                                <Option value="india">India</Option>
                                <Option value="china">China</Option>
                                <Option value="uk">UK</Option>
                                <Option value="australia">Australia</Option>
                                <Option value="germany">Germany</Option>
                                <Option value="spain">Spain</Option>
                                <Option value="finland">Finland</Option>
                                <Option value="italy">Italy</Option>
                                <Option value="france">France</Option>

                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="destinationCurrency"
                            label="Destination Currency"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select

                                onChange={this.onDestCurrencyChange}
                                allowClear
                            >
                                 <Option value="EUR">EUR</Option>
                                <Option value="GBP">GBP</Option>
                                <Option value="INR">INR</Option>
                                <Option value="RMB">RMB</Option>
                                <Option value="USD">USD</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="exchangeRate"
                            label="Exchange Rate"
                            rules={[
                                // {
                                //     required: true,
                                // }
                            ]}
                        >
                            {/* <InputNumber value={}  style={{ width: '100%' }} disabled={!this.state.showExchangeRate}/> */}
                            {console.log(this.state.exchangeRateValue)}
                            <Input value={this.state.exchangeRateValue}  style={{ width: '100%', fontWeight:400, color:'black', background:'white' }} disabled={true}/>
                            
                            {/* <Cascader options={residences} /> */}
                        </Form.Item>

                        {/* <Form.Item label="Use Prevailing Rate">
                               <Switch onChange = {this.prevRateChange}/>
                       </Form.Item> */}
                        <Form.Item name="expirationDate" label="Expiration Date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select expiration date!',
                                },]}>
                            <DatePicker placeholder="Valid Till" disabledDate={this.disabledDate}
                             />
                        </Form.Item>
                        <Form.Item
                            name="receivingBankName"
                            label="Receiving Bank Name"
                            rules={[
                                {

                                },
                                {
                                    required: true,
                                    message: 'Please input name of the bank!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="receivingAccountNumber"
                            label="Receiving Account Number"
                            rules={[
                                {
                                    validator: this.checkLicenseNum,
                                },
                                {
                                    required: true,
                                    message: 'Please input your account number!',
                                }
                            ]}
                        >
                            <Input type="tel" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="allowCounterOffers"
                            label="Counter Offers"
                            rules={[
                                // {
                                //     required: true,
                                // },
                            ]}
                        >
                            <Select

                                onChange={this.onMembershipChange}
                            >
                                <Option value="1">Allow</Option>
                                <Option value="2">Deny</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="allowSplitExchanges"
                            label="Split Exchange"
                            rules={[
                                // {
                                //     required: true,
                                // },
                            ]}
                        >
                            <Select

                                onChange={this.onMembershipChange}
                            >
                                <Option value="1">Allow</Option>
                                <Option value="2">Deny</Option>
                            </Select>
                        </Form.Item>
                       
                       

                        <Form.Item
                            {...tailFormLayout}
                        >


                            <Button type="primary" htmlType="submit" style={{width:'20%', paddingBottom:'2%'}}>
                                Post Offer
                            </Button>
                        </Form.Item>

                    </Form>
                </div>


           </div>
          );
        }
        
        
        
}
        
        
export default PostOffer;