import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl, Input } from "@material-ui/core";

function FirstStep({ data, handleChange, seterrmsg }) {
  let classData = useSelector((state) => state.classInfo.classData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setvalue] = useState();

  const handleStepChange = (type) => (e) => {
    setvalue();
    seterrmsg("");
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
