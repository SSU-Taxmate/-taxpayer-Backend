import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MainHeader from "../../components/Navigation/MainHeader";
import Footer from "../../components/Footer";
import "../../styles/css/main_page.css";

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GavelIcon from '@material-ui/icons/Gavel';
import ShowChartIcon from '@material-ui/icons/ShowChart';

class Main extends Component {
  componentWillMount() {
    document.getElementById("body").className = "text-gray-100";
  }

  render() {
    return (
      <div className=" bg-gradient bg-primary">
        <MainHeader></MainHeader>
        <section className="hero-wrap" style={{ height: 500 }}>
          <div className="container justify-content-center" id="mainContainer">
            <div
              className="row p-2 description js-fullheight "
              style={{ height: 500, display: "flex", alignItems: "center" }}
            >
              <div className="col text-center">
                <span style={{ fontSize: "3vw" }}>TAXMATE</span>
                <h4 className="mb-5">우리가 만들어가는 온라인 경제 국가</h4>
                <p>
                  <a
                    href="/signup"
                    className="btn px-4 py-3 shadow bg-white text-gray-900 font-weight-bold"
                  >
                    {" "}
                    <i className="fas fa-sign-in-alt"></i> Sign Up
                  </a>
                </p>
                
              </div>
            </div>
          </div>
        </section>

        {/* /.container-fluid */}
        <div className="bg-white py-2">
          <div className="container">
            <div className="py-4"></div>
            <div className="row row-cols-1 mt-3 mb-3 justify-content-center">
              <div className="col-md-7 text-gray-900">
                <h5 className="heading-section ">" 세금 내는 아이들 "</h5>
                <h6 className="mb-4"> &nbsp; 학생 참여형 경제 학습 플랫폼! </h6>
                <p className="p-2">
                  아이들의 눈높이에서 경제 / 경영 이야기를 풀어갑니다! <br></br>
                  온라인 학급화폐로 만들어가는 학급 경영 이야기! <br></br>{" "}
                  <br></br>
                  재미있는 경제 교육을 위한 원픽! TaxMate 지금 바로 함께하세요!
                </p>
              </div>
              <div className="col-md-5 embed-responsive embed-responsive-16by9 p-4">
              <iframe className="embed-responsive embed-responsive-16by9" src="https://www.youtube.com/embed/bhm08qUddso" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="py-2" style={{ background: "#EDEDE5" }}>
          <div className="container">
            <div className="py-3"></div>
            <div className="row row-cols-1 mt-3 mb-5 justify-content-center">
              <div className="col-md-5 d-lg-block">
                <img
                  id="main-part2-img"
                  src={require("../../assets/img/main-part2.png")}
                ></img>
              </div>
              <div className="col-md-7 text-gray-900" id="main-part-text">
                <h1 className="heading-section ">
                  " 우리가 만들어가는 온라인 경제 국가! "
                </h1>
                <h3 className="mb-4"> &nbsp; 학생 참여형 경제 학습 플랫폼! </h3>
                <p className="p-2 h4">
                  돈으로 움직이는 온라인 국가에서 친구들과 <br></br>함께하는
                  재미있는 경제 교육!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white pt-5">
          <div className="container bg-white pt-3">
            <div className="row row-cols-1 justify-content-center">
              <div className="col-md-7 mt-5 text-gray-900">
                <h1 className="heading-section ">
                  ' 돈의 흐름을 읽는다 ' &nbsp;- BANK{" "}
                </h1>
                <h3 className="mb-4">&nbsp; 부자되는 습관 기르기!</h3>
                <p className="p-2 h4">
                  스스로 돈도 벌고! 쓰고! 저축하고! 투자하고!<br></br>
                  Taxmate 만의 특별한 은행 ( 계좌 / 예금 ) 서비스를
                  이용해보세요!
                </p>
              </div>
              <div className="col-md-5 d-lg-block mb-5">
                <img
                  id="main-img3"
                  src={require("../../assets/img/bank.png")}
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "#EAEAE2" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-md-5  text-gray-900"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <img
                  id="main-part4-img"
                  src={require("../../assets/img/main-part4.jpg")}
                ></img>
              </div>
              <div className="col-md-7  text-gray-900 mt-5 mb-5">
                <div className="py-3 pl-5">
                  <h1 className="heading-section mb-2">
                    STOCK - ' 나도 한다 주식! '
                  </h1>
                  <h3 className="mb-4"> 간단하고 재미있는 학급 모의 주식! </h3>
                  <p className="p-2 h4 mb-4 ">
                    직접 돈 벌고 세금 내고 투자하고! 투자에도 연습이 필요하다!{" "}
                    <br></br>
                    TaxMate 모의 주식을 통해 주식 박사 되기!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white pt-5">
          <div className="container bg-white pt-3">
            <div className="row row-cols-1 justify-content-center">
              <div className="col-md-7 mt-5 text-gray-900">
                <h1 className="heading-section ">
                  ' LAW & SOCIAL - 법과 사회 '
                </h1>
                <h3 className="mb-4">
                  &nbsp; 경제 뿐 아니라 법/ 정치 / 사회 뽀개기!
                </h3>
                <p className="p-2 h4">
                  TAXMATE는 경제 학습 뿐 아니라 법/ 정치 / 사회 전반의 <br></br>
                  참여형 학습을 지원합니다!
                </p>
              </div>
              <div className="col-md-5 d-lg-block mb-5">
                <img
                  id="main-img5"
                  src={require("../../assets/img/main-part5.png")}
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div
          className="pt-5 pb-5 text-center"
          style={{ background: "#EAEAE2", color: "black" }}
        >
          <h3>
            TaxMate와 함께하는 즐거운 학급 경영!<br></br>
            <br></br> 지금 바로 TaxMate와 경제의 맛을 알아보세요!
          </h3>
        </div>

        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(Main);
