import React, { Component } from "react";

//Navigation
import Topbar from "../../../../components/Navigation/Topbar";
import Footer from "../../../../components/Footer";
import PageHeading from "../../../../components/PageHeading";
import BudgetSection from "./BudgetAll/BudgetSection";
import BudgetStatistics from "./BudgetAll/BudgetStatistics";
import ScrollToTop from "../../../../components/Scroll";
import ChartArea from "./BudgetCategory/ChartArea";
import TaxTypeArea from "./BudgetCategory";
class NationalTax extends Component {
  render() {
    return (
      <>
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <div className="container-fluid">
                <PageHeading title="나라 세금 통계" />
                {/*<!--재정 상황-->*/}
                <div
                  className="account-card shadow bg-white"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                  }}
                >
                  <BudgetSection />
                  <BudgetStatistics />
                </div>
                {/*<!--세입/세출-->*/}
                <div className="account-card shadow bg-white mt-4">
                  <TaxTypeArea />
                  <hr></hr>
                  <div className="row mt-4">
                    <ChartArea />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <ScrollToTop />
      </>
    );
  }
}

export default NationalTax;
