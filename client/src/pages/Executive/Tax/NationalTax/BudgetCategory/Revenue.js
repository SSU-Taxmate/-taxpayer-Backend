import React from "react";

function Revenue({ data }) {
  return (
    <div className="col">
      <p className="h4 font-weight-bold ">
        <a href="#revenue_detail">세입내역</a>
      </p>
      <div id="direct_tax" className="mt-3">
        <p className="h5 font-weight-bold ">직접세</p>
        <ul className="list-group list-group-flush h6">
          <li className="list-group-item">
            (재산) 소득세 : 
            <span style={{ float: "right", marginRight: "2rem" }}>{data.income} <sub>미소</sub>
            </span>
          </li>
          <li className="list-group-item">
            (재산) 부동산세 : 
            <span style={{ float: "right", marginRight: "2rem" }}>{data.realestate} <sub>미소</sub>
            </span>
          </li>
          <li className="list-group-item">
            (임대) 자리세 : 
            <span style={{ float: "right", marginRight: "2rem" }}>{data.place} <sub>미소</sub>
            </span>
          </li>
        </ul>
      </div>
      <div id="indirect_tax" className="mt-4">
        <p className="h5 font-weight-bold ">간접세</p>
        <ul className="list-group list-group-flush h6">
          <li className="list-group-item">
            (재산) 부가가치세 :  <span style={{ float: "right", marginRight: "2rem" }}>{data.electric}
             <sub>미소</sub>
             </span> 
          </li>
          <li className="list-group-item">
            {" "}
            (재산) 인지세 :  <span style={{ float: "right", marginRight: "2rem" }}> {data.stamp} <sub>미소</sub>
            </span>
          </li>
          <li className="list-group-item">
            (재산) 증권 거래세 :  <span style={{ float: "right", marginRight: "2rem" }}>  {data.stock} <sub>미소</sub>
            </span>
          </li>
        </ul>
      </div>
      <div className="mb-4 mt-4">
        <p className="h5 font-weight-bold ">벌금</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            총 벌금 : <span style={{ float: "right", marginRight: "2rem" }}> {data.fine} <sub>미소</sub></span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Revenue;
