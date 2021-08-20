import React from 'react'
import { InputLabel, OutlinedInput, InputAdornment, FormControl } from '@material-ui/core';
import * as Yup from 'yup';
import { useField } from "formik";

function SecondStep(props) {
    const [field, meta] = useField(props);
  
    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="saveAmount">예금 금액</InputLabel>
            <OutlinedInput
                id="saveAmount"
                value={"얼마를 넣어야 할까요"}
                endAdornment={<InputAdornment position="end">미소</InputAdornment>}
                labelWidth={60}
                {...field}
            />
        </FormControl>
    )
}

SecondStep.validationSchema = Yup.object().shape({
    saveAmount: Yup.string().required("Required").nullable()
})
SecondStep.label = "저축할 금액 입력"
export default SecondStep
