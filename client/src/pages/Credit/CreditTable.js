import React, { useState } from "react";
import "../../styles/css/credit.css";

function CreditTable() {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr className="creditBaseTable">
            <th scope="col">1등급</th>
            <th scope="col">2등급</th>
            <th scope="col">3등급</th>
            <th scope="col">4등급</th>
            <th scope="col">5등급</th>
            <th scope="col">6등급</th>
            <th scope="col">7등급</th>
            <th scope="col">8등급</th>
            <th scope="col">9등급</th>
            <th scope="col">10등급</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>90 - 100 점</td>
            <td>80- 89 점</td>
            <td>70 - 70 점</td>
            <td>60 - 69 점</td>
            <td>50 - 59 점</td>
            <td>40 - 49 점</td>
            <td>30 - 39 점</td>
            <td>20 - 29 점</td>
            <td>10 - 19 점</td>
            <td>0 - 9 점</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CreditTable;
