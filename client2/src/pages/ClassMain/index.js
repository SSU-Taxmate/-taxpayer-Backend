import React, { useState } from 'react'
//Navigation
import PageHeading from "../../components/PageHeading";
import { useSelector } from "react-redux";
import "../../styles/css/class_main.css"
import TaxPanel from './components/TaxPanel';
import BankPanel from './components/BankPanel';
import CongressPanel from './components/CongressPanel';
import StockPanel from './components/StockPanel';
import PageFrame from "../PageFrame";
function ClassMain() {
  let user = useSelector((state) => state.user);

  return (
    <PageFrame>
      <PageHeading title="클래스 Dashboard" />

      <div className="row justify-content-center ">
        <div className="col-lg-10 col-xs-12">
          <div className="card-body m-4">
            <div className="row">
              <div className="col-lg-6 mb-0">
                {/* 학생 - 계좌 요약 정보, 선생님 - 세금 요약 정보*/}
                {user.userData && (user.userData.role === 1 ? <BankPanel /> : <TaxPanel />)}
                <hr className="m-0" />
                <div className="py-3"></div>
                {/* 국회 */}
                <CongressPanel />
              </div>
              <div className="col-lg-6">
                {/* 주식 */}
                <StockPanel />
              </div>
            </div>
          </div>
        </div>
      </div>


    </PageFrame>
  );
}

export default ClassMain;
