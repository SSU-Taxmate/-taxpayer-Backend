import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

function PaySalary() {
  let classData = useSelector((state) => state.classInfo.classData);

  const onhandleclick = () => {
    axios
      .post("/api/jobs/paysalary", { classId: classData.classId })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="col">
      <div className="card">
        <div className="card-header">월급 설정</div>
        <div className="card-body">
          {classData.classId && (
            <Button variant="outlined" color="primary" onClick={onhandleclick}>
              월급 부여하기
            </Button>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">직업 및 월급 설정 사용법</div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">- 직업 설정은 ~ 캐 해라</p>
        </div>
      </div>
    </div>
  );
}

export default PaySalary;
