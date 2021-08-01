import React, { Component } from 'react';

 class MainHeader extends Component{

    render() {
           
   return (

    <nav className="navbar navbar-expand-lg ftco-navbar-light text-gray-100" id="ftco-navbar" style={{background:"rgba(0, 0, 0, 0)"}}>
    <div className="container">
    <a className="d-flex align-items-center justify-content-center" href="main.html">
       <div className="rotate-n-15">
           <i className="fas fa-piggy-bank" style={{color:"#FFFFFF"}}></i>
       </div>
       <div className="mx-3"style={{color:'#FFFFFF'}}>TAX MATE</div>
   </a>
 


      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation" style={{color:'#FFFFFF'}}>
      <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="ftco-nav">
        <ul className="navbar-nav ml-auto">
            <li className="dropdown nav-item">
          <a href="#" className="dropdown-toggle nav-link icon d-flex align-items-center" data-toggle="dropdown" aria-expanded="false"style={{color:'#FFFFFF'}}>
            커뮤니티
            <b className="caret"></b>
          </a>
          <div className="dropdown-menu dropdown-menu-left">
            <a href="#" className="dropdown-item">connect us</a>
            <a href="#" className="dropdown-item">자주묻는 질문 </a>
          </div>
        </li>
          <li className="nav-item"><a href="/signin" className="nav-link icon d-flex align-items-center"style={{color:'#FFFFFF'}}> SIGN IN</a></li>

        </ul>
      </div>
      </div>
  </nav>




  )

    }


}

export default MainHeader;
   
   
   
