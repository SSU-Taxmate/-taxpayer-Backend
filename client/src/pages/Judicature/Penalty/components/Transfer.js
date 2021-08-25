import React, { useState } from 'react';
import { Component } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import "../../../../styles/css/transfer.css"


const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }));


  const inputStyles = makeStyles((theme) => ({
    root: {
      width: 100,
      height: 75,
      '& > * + *': {
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

class Transfer extends Component {

render(){

    return(
    <div className="col-lg-8 justify-content-center">

        <Autocomplete className="py-3"
        style={{useStyles}}
        options={this.props.laws}
        variant="outlined"
        getOptionLabel={(option) => option.title}
        required

        renderInput={(params) => <TextField {...params} label="법률" variant="outlined" />} />

        <Autocomplete className="py-3"
        style={{useStyles}}
        options={this.props.users}
        variant="outlined"
        getOptionLabel={(option) => option.name}
        required

        renderInput={(params) => <TextField {...params} label="받는사람 이름" variant="outlined" />} />


<div className="row justify-content-center">
<div className="row m-4 input_fine justify-content-center align-items-center">
        
        <TextField 
            className="bg-white"
            style={{inputStyles}}
            required
            variant="outlined"
            defaultValue="0"
            
            name="numberformat"

            InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      </div></div>


        <div className="d-flex justify-content-center py-3">
            <div className="p-2 btn btn-primary"> 부과하기 </div>
        </div>
       
   </div>
    )
}
}

export default Transfer;