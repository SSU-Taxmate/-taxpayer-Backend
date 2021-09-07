import React, { useState } from 'react'
import { useSelector } from "react-redux";

import "../../styles/css/class_main.css"
import TaxPanel from './components/TaxPanel';
import BankPanel from './components/BankPanel';
import CongressPanel from './components/CongressPanel';
import StockPanel from './components/StockPanel';


export default function ClassMainDetail() {

    let user = useSelector((state) => state.user);

    return (

    /* student 기준 */
        <div className="row justify-content-center ">
            <div className="col-lg-10 col-xs-12">
                <div className="card-body m-4">
                    <div className="row">
                        <div className="col-lg-6 mb-0">
                            
                        {user.userData && (user.userData.role === 1 ?  <BankPanel/>:<TaxPanel/>)}
                            <hr className="m-0"/>
                            
                            <div className="py-3"></div>
                            <CongressPanel/>
                                
                        </div>

                    <div className="col-lg-6">
                   
                   <StockPanel/>
                    </div>
              </div>
                </div>
            </div>
            </div>
    )
}

