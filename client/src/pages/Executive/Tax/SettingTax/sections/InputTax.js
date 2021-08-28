import React from 'react'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

function InputTax({ title, value, name, readOnly, onChange, unit }) {
  //console.log('inputtax', value)                step="5"

  return (
  
      <TextField
        id={`tax-${title}`}
        label={title}
        type="number"
        variant="outlined"
        defaultValue={value}
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
          inputProps: { min: 0, max: 100 },
          readOnly:readOnly
        }}
        name={name}
        onChange={onChange}
      />

  )
}

export default InputTax
