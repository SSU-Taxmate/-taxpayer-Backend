import React from 'react'
import * as Yup from 'yup';
import { useFormikContext } from 'formik';

function ConfirmStep() {
    const { values: formValues } = useFormikContext();

    return (
        <div>
            {console.log('formvalues',formValues)}
        </div>
    )
}
ConfirmStep.validationSchema = Yup.object().shape({
})
ConfirmStep.label = "예금 계좌 확인"
export default ConfirmStep
