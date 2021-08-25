import React from 'react'
import { InputLabel, OutlinedInput, InputAdornment, FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core'

function SecondStep({ data, handleChange ,balance}) {

    return (
        <>
            {/* 
        <FormControl variant="outlined">
            <InputLabel htmlFor="saveAmount">예금 금액</InputLabel>
            <OutlinedInput
                id="saveAmount"
                value={data.amount}
                type='number'
                endAdornment={<InputAdornment position="end">미소</InputAdornment>}
                onChange={handleChange('amount')}
            />
        </FormControl>
    */}
            <TextField
                id="saveAmount"
                label="예금 금액"
                variant="outlined"
                type="number"
                value={data.amount}
                InputProps={{
                    inputProps: {
                        min: data.product.minAmount,
                        max:balance
                    },
                    endAdornment:<InputAdornment position="end">미소</InputAdornment>
                }}
                
                onChange={handleChange('amount')}
            />
        </>
    )
}


export default SecondStep
