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
  <section class="hero-wrap" style={{height: 500}}>
    <div class="container">
        <div class="row description js-fullheight align-items-center justify-content-center" style={{height: 500}}>
            <div class="col-md-8 text-center">
                <div class="text">
                    <h1>TAXMATE.</h1>
                    <h4 class="mb-5">가장 간단한 경제를 만나보세요.</h4>
                    <p><a href="/signup" class="btn px-4 py-3 shadow bg-white text-gray-900 font-weight-bold"> <i class="fas fa-sign-in-alt"></i> Sign Up</a></p>
                </div>
            </div>
        </div>
    </div>
</section>


 {/* /.container-fluid */}
 <div class="py-4"></div>
 <div class="bg-white py-4">
			<div class="container">
                <div className="py-4"></div>
				<div class="row justify-content-center">
					<div class="col-md-5 text-gray-900">
						<h2 class="heading-section mb-4 pb-md-3">
							Bootstrap Carousel
						</h2>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
					</div>
					<div class="col-md-7 d-none d-lg-block bg-tax-main">
						   
					</div>
				</div>
			</div>
     
</div>

<div class="bg-white py-4">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-md-7 text-gray-900">


                        </div>
						
					<div class="col-md-5 text-gray-900">
                        <div className="py-3"></div>
                    <h4 class="heading-section mb-4 pb-md-3">
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