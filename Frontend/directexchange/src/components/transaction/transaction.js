
import React, { Component } from 'react';
import { } from 'antd';
import UserHeader from '../userHeader';
import EachTransaction from './eachTransaction';


class Transaction extends Component{

    constructor(){
        super();
       this.state = {
            data:[],
            loaded:false
       } 

    }

    componentDidMount(){
        //api request to load table
        console.log(this.props);
       
    }

    /*

allowCounterOffers: "deny"
allowSplitExchanges: "allow"
amountToRemitSourceCurrency: 100000
destinationCountry: "usa"
destinationCurrency: "USD"
exchangeRate: 0.0138
expirationDate: "2020-12-15T01:05:01.330Z"
id: 8
offerStatus: "InTransaction"
proposedOffers: []
receivingAccountNumber: 3333
receivingBankName: "eeee"
sourceCountry: "india"
sourceCurrency: "INR"
transactionDetails: Array(2)
0: {id: 13, amount: 100000, createDate: "", expiryDate: "", percentOfTotalAmount: 5, …}
1: {id: 14, amount: 100000, createDate: "", expiryDate: "", percentOfTotalAmount: 5, …}
length: 2
__proto__: Array(0)
user:
authMode: "fb"
isVerified: true
name: "priyanka"
nickname: "priyanka"
password: "abc"
userName: "priyanka18sharma91@gmail.com"
    */

    render(){
        return (
           <div>
             <div>
                    <UserHeader selectedKey={['6']} />
                    </div>
                    <br></br>

               <div>
                <h1 style={{paddingTop:'2%', textAlign:'center'}} ><strong>Your Pending Transactions</strong></h1>
                {
                    this.state.loaded && this.state.data.map((value, ind)=>{
                        return(
                            <EachTransaction key={ind} transaction = {value}></EachTransaction>

                        )
                    })
                }

             </div>


            </div>
        );
    }
}

export default Transaction;


