import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Select from "@material-ui/core/Select";
import { InputLabel, FormControl } from "@material-ui/core";

function FirstStep({ data, handleChange, seterrmsg }) {
  let classData = useSelector((state) => state.classInfo.classData);
  const [deposits, setdeposits] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setvalue] = useState();
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get("/api/bank/deposits", {
        params: { classId: classData.classId, joinPossible: true },
      });
      setdeposits(result.data);
      //console.log(result.data)
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleStepChange = (type) => (e) => {
    //console.log(deposits[e.target.value]._id)
    //console.log(e.target.value)
    setvalue(
      deposits[deposits.findIndex((i) => i._id === e.target.value)].name
    );
    seterrmsg("");

    handleChange(type);
    data.product =
      deposits[deposits.findIndex((i) => i._id === e.target.value)];
    data.amount = data.product.minAmount;
  };
  return (
    <>
      {deposits && (
        <>
          <FormControl variant="outlined">
            <InputLabel htmlFor="depositSelect">예금 상품</InputLabel>
            <Select
              inputProps={{ id: "depositSelect" }}
              native
              value={data.product ? data.product._id : ""}
              onChange={handleStepChange("product")}
            >
              <option value="" disabled />
              {deposits.map((deposit, i) => (
                <option key={deposit._id} value={deposit._id}>
                  {deposit.name}
                </option>
              ))}
            </Select>
          </FormControl>
          {data.product && (
            <div>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item list-inline"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "inline" }}>이율</div>
                  <div style={{ display: "inline" }}>
                    {data.product.interestRate}%
                  </div>
                </li>
                <li
                  className="list-group-item"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "inline" }}>최소가입금액</div>
                  <div style={{ display: "inline" }}>
                    {data.product.minAmount}
                  </div>
                </li>
                <li
                  className="list-group-item"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "inline" }}>최소 가입기간</div>
                  <div style={{ display: "inline" }}>
                    {data.product.minDuration}일
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FirstStep;
