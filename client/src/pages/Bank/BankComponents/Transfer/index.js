import React, { useState } from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import { InputAdornment } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }));

const user_list = [{name: "배미혜"},{name: "김승주"},{name: "박은정"}, {name: "배미혜"}]

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

class Transfer extends Component {

render(){

    return(
    <div id="account_transfer">
        <Autocomplete className="py-3"
        style={{useStyles}}
        id="transfer_target"
        options={user_list}
        variant="outlined"
        getOptionLabel={(option) => option.name}
        required

        
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />} />


        <TextField className="col-lg-12"
            
            style={{useStyles}}
            id="transfer_sum"
            required
            variant="outlined"
            defaultValue="0"
            
            name="numberformat"

            InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />


        <div className="d-flex justify-content-center py-3">
            <div className="p-2 btn btn-primary"> 이체하기 </div>
        </div>
       
   </div>
    )
}
}

export default Transfer;