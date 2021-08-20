import React, { useState, useEffect } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ConfirmStep from './ConfirmStep';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Form, Formik } from 'formik';
import checkoutFormModel from './checkoutFormModel';

const steps = [FirstStep, SecondStep, ConfirmStep]//['예금상품 선택하기', '저축할 금액 입력', '예금 계좌 확인'];
const validationSchema = [
  FirstStep.validationSchema,
  SecondStep.validationSchema,
  ConfirmStep.validationSchema]

const { formId, formField } = checkoutFormModel;

const formInitialValues = {
  [formField.depositSelect.name]: '',
  [formField.saveAmount.name]: ''
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <FirstStep name={formField.depositSelect.name}label={formField.depositSelect.label}/>;
    case 1:
      return <SecondStep name={formField.saveAmount.name}label={formField.saveAmount.label}/>;
    case 2:
      return <ConfirmStep />;
    default:
      return 'Unknown stepIndex';
  }
}


function DepositAdd() {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handlesubmit = (values, actions) => {
    console.log('handlesubmit', values)
    if (activeStep === steps.length - 1) {
      //axios.post
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);

    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }
  return (
    <>
      <div className="row py-3 justify-content-center">
        <div className="account-card shadow justify-content-center col-md-12 bg-white">
          <div className="text-center" onClick={handleClickOpen}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">예금 상품 가입</DialogTitle>
        <DialogContent>
          <>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{steps[index].label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <div >All steps completed</div>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (

                <Formik
                  initialValues={formInitialValues}
                  validationSchema={validationSchema[activeStep]}
                  onSubmit={handlesubmit}>
                  {({ isSubmitting }) => (
                    <Form id={formId}>
                      {getStepContent(activeStep)}
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </Form>
                  )}



                </Formik>



              )}
            </div>
          </>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DepositAdd
