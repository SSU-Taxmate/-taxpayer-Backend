import React, { useState } from "react";
import CardCollapse from "../../components/Cards/Collapse";
import CreditTable from "./CreditTable";
import CreditStudentTable from "./CreditShow";
import CardBasic from "../../components/Cards/Basic";
import ChartPie from "../../components/Charts/Pie";
function CreditDetail() {
  const credit_pie_data = {
    labels: [
      "1등급",
      "2등급",
      "3등급",
      "4등급",
      "5등급",
      "6등급",
      "7등급",
      "8등급",
      "9등급",
      "10등급",
    ],
    datasets: [
      {
        data: [20, 15, 30, 25],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(255, 95, 46)",
        ],
        hoverOffset: 2,
      },
    ],
  };

  return (
    <div>
      <CardCollapse title={"신용등급 기준표"} area_id={"credit"} key={"credit"}>
        <CreditTable></CreditTable>
      </CardCollapse>

      <CardBasic title="신용등급 상황">
        <div className="row">
          <div className="col col-sm-6">
            <CreditStudentTable></CreditStudentTable>
          </div>
          <div
            className="col col-sm-5"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: " space-around",
            }}
          >
            <ChartPie
              title="신용등급 현황"
              id="신용등급 현황"
              data={credit_pie_data}
            ></ChartPie>
          </div>
        </div>
      </CardBasic>
    </div>
  );
}

export default CreditDetail;
