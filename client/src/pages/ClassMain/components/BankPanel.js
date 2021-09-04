import React, { useState } from 'react'


function BankPanel() {
    return (

        <div>
        <div className="row justify-content-center">
        <div className="col-xl-10 col-md-10 ">
        <div className=" h-100 py-2">

<div className="card-body">
    <div className="row no-gutters align-items-center">
    <div className="col-auto d-none d-sm-inline">
                    <i className="fas fas fa-university fa-2x text-gray-300 "></i>
                </div>
                <div className="px-2  d-none d-sm-inline"></div>
                    <div className="col">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">은행</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800 ">내 계좌 잔액</div>    

                    </div>

                       
                    <div className="px-3 "></div>
                <div className="col-auto">
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>    </div>
</div>
</div>

</div>
</div>

</div>

    <hr className="m-0"/>

    <div className="row justify-content-center">

        <div className="col-xl-5 col-md-5 ">
            <div className=" h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    이번 달 수입</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
            </div>
            <div className="col-auto  "> <i className="fas fa-calendar fa-2x text-gray-300"></i></div></div></div></div></div>
        
        <div className="seperator-gray py-5 m-0 px-0 d-none d-sm-inline"></div>

        <div className="col-xl-5 col-md-5">
            < div className = "h-100 py-2" >
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        예금</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">D-14</div></div>
            <div className="col-auto"><i className="fas  fa-money-check fa-2x text-gray-300"></i></div></div></div></div></div>                    

</div></div>

    )


}
        
        

export default BankPanel;
