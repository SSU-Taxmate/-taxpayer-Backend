import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import MainHeader from '../../components/Navigation/MainHeader';
import Footer from '../../components/Footer';

class Main extends Component{
    componentWillMount(){
        document.getElementById('body').className="text-gray-100"
      }


render(){

return(

<div className=" bg-gradient-primary">
 <MainHeader></MainHeader>
  <section className="hero-wrap" style={{height: 500}}>
    <div className="container">
        <div className="row description js-fullheight align-items-center justify-content-center" style={{height: 500}}>
            <div className="col-md-8 text-center">
                <div className="text">
                    <h1>TAXMATE.</h1>
                    <h4 className="mb-5">가장 간단한 경제를 만나보세요.</h4>
                    <p><a href="/signup" className="btn px-4 py-3 shadow bg-white text-gray-900 font-weight-bold"> <i className="fas fa-sign-in-alt"></i> Sign Up</a></p>
                </div>
            </div>
        </div>
    </div>
</section>


 {/* /.container-fluid */}
 <div className="py-4"></div>
 <div className="bg-white py-4">
			<div className="container">
                <div className="py-4"></div>
				<div className="row justify-content-center">
					<div className="col-md-5 text-gray-900">
						<h2 className="heading-section mb-4 pb-md-3">
							Bootstrap Carousel
						</h2>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
					</div>
					<div className="col-md-7 d-none d-lg-block bg-tax-main">
						   
					</div>
				</div>
			</div>
     
</div>

<div className="bg-white py-4">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-7 text-gray-900">


                        </div>
						
					<div className="col-md-5 text-gray-900">
                        <div className="py-3"></div>
                    <h4 className="heading-section mb-4 pb-md-3">
							나만의 계좌를 만들어 관리해보세요
						</h4>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>

						   
					</div>
				</div>
			</div>
     
</div>
<Footer></Footer>

</div>


    
);

}


}

export default withRouter(Main);