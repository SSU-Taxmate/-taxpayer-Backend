import React from "react";

function Expenditure({ data }) {
  return (
    <div className="col">
      <p className="h4 font-weight-bold ">
        <a href="#expenditure_detail">세출내역</a>
      </p>
      <ul className="list-group list-group-flush mt-3">
        <li className="list-group-item">
          문화비 :
          <span style={{ float: "right", marginRight: "2rem" }}>
            {data.culture} <sub>미소</sub>
          </span>
        </li>
        <li className="list-group-item">
          {" "}
          교육비 :{" "}
          <span style={{ float: "right", marginRight: "2rem" }}>
            {" "}
            {data.education} <sub>미소</sub>
          </span>
        </li>
        <li className="list-group-item">
          환경미화비 :
          <span style={{ float: "right", marginRight: "2rem" }}>
            {data.environment} <sub>미소</sub>
          </span>
        </li>
        <li className="list-group-item">
          기타 :{" "}
          <span style={{ float: "right", marginRight: "2rem" }}>
            {data.etc} <sub>미소</sub>
          </span>
        </li>
      </ul>
      <div className="row mt-4">
        <div className="col">
          <p className="h5 font-weight-bold pl-3">한 줄 분석</p>
          <div className="col ml-1">
            <textarea
              rows="5"
              readOnly={true}
              className="form-control"
              id="evaluation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenditure;
