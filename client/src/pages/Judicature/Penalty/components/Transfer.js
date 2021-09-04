import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import { Button } from "@material-ui/core";
import "../../../../styles/css/transfer.css";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const inputStyles = makeStyles((theme) => ({
  root: {
    width: 100,
    height: 75,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

// class에서 student_list 받아오기

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
}

function Transfer(props) {
  const [lawReason, setLaw] = useState(null);
  const [studentId, setStudent] = useState(null);
  const [Amount, setAmount] = useState(0);

  // 리덕스에 있는 정보 가져오기!
  let classData = useSelector((state) => state.classInfo.classData);

  const studenthandleChange = (e, values) => {
    e.preventDefault();
    setStudent(values);
  };

  const lawhandleChange = (e, values) => {
    e.preventDefault();
    setLaw(values);
  };

  const AmounthandleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const data = {
      classId: classData.classId,
      lawReason,
      studentId: studentId.studentId,
      Amount,
    };
    axios
      .post(`/api/fine/`, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log("testing fine error");
      });
  };
  return (
    <div className="col-lg-8 justify-content-center">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          className="py-3"
          style={{ useStyles }}
          options={props.laws}
          variant="outlined"
          getOptionLabel={(option) => option.title}
          required
          name="Law"
          onChange={lawhandleChange}
          renderInput={(params) => (
            <TextField {...params} label="법률" variant="outlined" />
          )}
        />

        <Autocomplete
          className="py-3"
          style={{ useStyles }}
          options={props.users}
          variant="outlined"
          onChange={studenthandleChange}
          getOptionLabel={(option) => option.name}
          required
          renderInput={(params) => (
            <TextField
              {...params}
              label="받는사람 이름"
              variant="outlined"
              name="Student"
            />
          )}
        />

        <div className="row justify-content-center">
          <div className="row m-4 input_fine justify-content-center align-items-center">
            <TextField
              className="bg-white"
              style={{ inputStyles }}
              required
              variant="outlined"
              onChange={AmounthandleChange}
              defaultValue="0"
              name="Amount"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center py-3">
          <Button color="primary" type="submit">
            부과하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Transfer;
