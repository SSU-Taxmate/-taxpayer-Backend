import React from 'react'
import {  InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core'

function SecondStep({ data, handleChange ,balance}) {

    return (
        <>
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
