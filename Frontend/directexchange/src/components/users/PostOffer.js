import React, { Component } from 'react';
import { Form, Input, Alert, Select, Button, Row, Col, DatePicker, InputNumber, Switch } from 'antd';
import Headers from '../Header';
import Footer from '../Footer';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';
import {ratesTable} from '../../config/ratesInfo';

const { MonthPicker } = DatePicker;

const { Option } = Select;

let username = localStorage.getItem('username');
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

    componentDidMount() {

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
        let userId = 0;

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
                span: 10,
            },
        };

        return ( 
           <div>

        {this.state.redirectPage}
                <div>
                    <Headers selectedKey={['2']} />
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
                            name="sourcecountry"
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
                            name="sourcecurrency"
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
                            name="remit"
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
                            name="destcountry"
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
                            name="destcurrency"
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
                            name="exchangerate"
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
                        <Form.Item name="datepicker" label="Expiration Date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select expiration date!',
                                },]}>
                            <DatePicker placeholder="Valid Till" disabledDate={this.disabledDate}
                             />
                        </Form.Item>
                        <Form.Item
                            name="bankname"
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
                            name="accountnumber"
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
                            name="counteroffers"
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
                            name="splitexchange"
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
                <div>
                    <Footer/>
                </div>

           </div>
          );
        }
        
        
        
}
        
        
export default PostOffer;