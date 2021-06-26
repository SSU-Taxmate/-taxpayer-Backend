import React, { Component } from 'react';

class Account extends Component {



    render() {return(

        <div className="account-card shadow justify-content-center">

                        <div className="text-sm">    홍길동님의 계좌</div>

                         <div className="text-center py-4" > <h1> $ 100,000 </h1></div>

                            <hr/>

                            <div className="row">
                            <div className="col-md-5 text-center"> 이체 </div>
                            <div className="col-md-2 py-2"></div>

                            <div className="col-md-5 text-center"> 이용내역 </div>

                            </div>
        </div>
    )
    
    }
}

export default Account;