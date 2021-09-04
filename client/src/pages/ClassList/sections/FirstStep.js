import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Select from "@material-ui/core/Select";
import { InputLabel, FormControl, Input } from "@material-ui/core";

function FirstStep({ data, handleChange, seterrmsg }) {
  let classData = useSelector((state) => state.classInfo.classData);
  const [deposits, setdeposits] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setvalue] = useState();
  console.log("data", data);
  //   const fetchData = async () => {
  //     setIsError(false);
  //     setIsLoading(true);
  //     try {
  //       const result = await axios.get("/api/bank/deposits", {
  //         params: { classId: classData.classId, joinPossible: true },
  //       });
  //       setdeposits(result.data);
  //       //console.log(result.data)
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setIsLoading(false);
  //   };
  useEffect(() => {
    // fetchData();
  }, []);
  const handleStepChange = (type) => (e) => {
    //console.log(deposits[e.target.value]._id)
    //console.log(e.target.value)
    setvalue();
    seterrmsg("");
    console.log(type);
    handleChange(type);
    data.entryCode = e.target.value;
  };
  return (
    <>
      <FormControl variant="outlined" className="mb-3">
        국가 코드 입력 :
        <Input onChange={handleStepChange("entryCode")}>
          국가코드를 입력하세요
        </Input>
      </FormControl>
    </>
  );
}

export default FirstStep;
