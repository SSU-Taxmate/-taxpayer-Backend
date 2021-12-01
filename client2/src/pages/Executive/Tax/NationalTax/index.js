import React, { Component } from "react";

//Navigation
import PageHeading from "../../../../components/PageHeading";
import BudgetSection from "./BudgetAll/BudgetSection";
import BudgetStatistics from "./BudgetAll/BudgetStatistics";
import PageFrame from "../../../PageFrame";
import ChartArea from "./BudgetCategory/ChartArea";
import TaxTypeArea from "./BudgetCategory";
class NationalTax extends Component {
  render() {
    return (
      <PageFrame>
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
      </PageFrame>
    );
  }
}

export default NationalTax;
