import React, { useState } from 'react';
import { Component } from 'react';
import Transfer from '../Transfer';


class Deposit extends React.Component{

    constructor(props){
        super(props);
      }

        render(){ 
            
           // const [balance, setBlance] = useState(this.props.balance);
           // const [interest, setInterest] = useState(this.props.interest);

          //  const interestCalculator = () => {
          //      setBlance(balance*(1+interest));
          //    }

            
            
            return(

            <div className="row justify-content-center">    
            <div className="account-card shadow justify-content-center col-md-6 bg-white nav-link collapsed"  href="#" data-toggle="collapse" data-target="#collapse_deposit" aria-controls="collapseTwo">
                <div className="d-flex justify-content-between">
                    <div className="col-md-4" >예금 계좌</div>
                    <div className="col-md-8" style={{textAlign:'right'}}>$ {this.props.balance} </div>
                </div>

                <div id="collapse_deposit" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">

            <div className="bg-white py-2 collapse-inner rounded ">

            <div className="text-center " > 만기시: $ {this.props.balance} </div>
            <div className="text-center py-3" > 지금 해지시: $ {this.props.balance} </div>

            <div className="d-flex justify-content-center">
            <div className="p-2 btn btn-primary"> 이체하기 </div>
        </div>
             
            </div>
          </div></div></div>

        )
    }
    
    
    }

    export default Deposit;