import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

function InputTax({ title, value, name, readOnly, onChange, unit }) {
  const useStyles = makeStyles({
    taxInput: {
      marginRight: "3rem",
      marginBottom: "1rem",
      width: "13rem",
    },
  });
  const classes = useStyles();
  return (
    <TextField
      className={classes.taxInput}
      id={`tax-${title}`}
      label={title}
      type="number"
      variant="outlined"
      defaultValue={value}
      InputProps={{
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        inputProps: { min: 0, max: 100 },
        readOnly: readOnly,
      }}
      name={name}
      onChange={onChange}
    />
  );
}

export default InputTax;
