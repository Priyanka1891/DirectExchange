
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
        title: '# Completed Transactions',
        dataIndex: 'completedtransctions',
        key: 'completedtransctions',
      },
      {
        title: '# Remitted Amount(USD)',
        dataIndex: 'remittedamount',
        key: 'remittedamount',
      },
      {
        title: 'Total Service Fee',
        dataIndex: 'servicefee',
        key: 'servicefee',
      },
      {
        title: '# Uncompleted Transactions',
        dataIndex: 'uncompletedtransctions',
        key: 'uncompletedtransctions',
      },
     
  ];


class SystemReport extends Component{

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

export default SystemReport;


