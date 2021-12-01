import React, { useState } from "react";
import "../../styles/css/credit.css";

function CreditShowTable() {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr className="creditBaseTable">
            <th colSpan="3" scope="col">
              신용등급 분포!
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1등급</td>
            <td colSpan="2">🙋‍♀️, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>2등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>3등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>4등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>5등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>6등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>7등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>8등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>9등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
          <tr>
            <td>10등급</td>
            <td colSpan="2">아이1, 아이2, 아이3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default CreditShowTable;
