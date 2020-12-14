
import React, { Component } from 'react';
import { Card, Button } from 'antd';


class EachTransaction extends Component{

    constructor(){
        super();
       this.state = {
           dataSource:this.props,
            
       } 

    }

    componentDidMount(){
        //has paid field to be true
        //if both user has paid then offer status is fulfilled.
    }

    

    pay = (e) => {
        //change status to paid

    }

    render(){
        return (
           <div>
               <div>
               <Card.Grid>
                        <p>Amount to Transfer: </p>
                        <p>Currency: </p>
                        <p>Destination Country: </p>
                        <Button onClick={this.pay} style={{background:'green'}}>Pay</Button>
                </Card.Grid>
             </div>


            </div>
        );
    }
}

export default EachTransaction;


