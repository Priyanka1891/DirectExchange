
import React, { Component } from 'react';
import { Table, Tag, Space, DatePicker } from 'antd';
import {urlConfig} from '../../config/config';
import axios from "axios";


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Source Currency',
        dataIndex: 'sourcecurrency',
        key: 'sourcecurrency',
      },
      {
        title: 'Source Amount',
        dataIndex: 'sourceamount',
        key: 'sourceamount',
      },
      {
        title: 'Destination Currency',
        dataIndex: 'destcurrency',
        key: 'destcurrency',
      },
      {
        title: 'Destination Amount',
        dataIndex: 'destamount',
        key: 'destamount',
      },
      {
        title: 'Service Fee',
        dataIndex: 'servicefee',
        key: 'servicefee',
      }, {
        title: 'Total Amount',
        dataIndex: 'total',
        key: 'total',
      },
     
  ];


class TransctionHistory extends Component{

    constructor(){
        super();
       this.state = {
           dataSource:[],
            
       } 

    }

    componentDidMount(){
        //api request to load table

        const data = [];

          this.setState({
              dataSource:data
          })
          
    }

    render(){
        return (
           <div>
             <div>
                   
                   </div>
                   <div>
                   <div>
                <h1 style={{paddingTop:'2%', textAlign:'center'}} ><strong>Your Transaction History</strong></h1>

             <Table style={{paddingTop:'1%'}}  dataSource={this.state.dataSource} columns={columns} />;
             </div>
                       </div>


            </div>
        );
    }
}

export default TransctionHistory;


