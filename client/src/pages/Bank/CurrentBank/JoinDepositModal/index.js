import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ConfirmStep from "./ConfirmStep";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const steps = [FirstStep, SecondStep, ConfirmStep];
const label = ["예금상품 선택하기", "저축할 금액 입력", "계약서 확인 및 제출"];

function DepositAdd({ balance }) {
  const joinedUser = useSelector((state) => state.classUser);
  const [open, setOpen] = useState(false); //전체 dialog open
  const [activeStep, setActiveStep] = useState(0); //순서
  const [data, setdata] = React.useState({
    product: undefined,
    amount: 0,
  });
  const [errmsg, seterrmsg] = useState(""); //step마다 생기는 errmsg

  // stepper내 component에서 받은 데이터 저장
  const handleChange = (type) => (e) => {
    setdata({ ...data, [type]: e.target.value });
    console.log(data);
  };

  //전체 dialog open/close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // stepper
  const handleNext = () => {
    if (activeStep === 0) {
      if (data.product === undefined) {
        return seterrmsg("상품을 선택해주세요");
      }
    } else if (activeStep === 1) {
      if (data.amount < data.product.minAmount) {
        return seterrmsg(
          `최소 가입 금액(${data.product.minAmount}) 이상 입력해주세요`
        );
      } else if (data.amount > balance) {
        return seterrmsg(`통장에 돈이 모자랍니다(보유:${balance})`);
      }
    } else {
    }
    seterrmsg("");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    seterrmsg("");
  };

  const handleReset = () => {
    setdata({
      product: undefined,
      amount: 0,
    });
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <FirstStep
            data={data}
            handleChange={handleChange}
            seterrmsg={seterrmsg}
          />
        );
      case 1:
        return (
          <SecondStep
            data={data}
            handleChange={handleChange}
            balance={balance}
          />
        );
      case 2:
        return <ConfirmStep data={data} handleChange={handleChange} />;
      default:
        return "Unknown stepIndex";
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/bank/deposits/${data.product._id}/join`, {
        studentId: joinedUser.classUser,
        amount: data.amount,
      }) //
      .then(function (response) {
        console.log(response);
        handleNext();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //sucess
  return (
    <>
      <div className="row py-3 justify-content-center">
        <div className="account-card shadow justify-content-center col-md-12 bg-white">
          <div className="text-center" onClick={handleClickOpen}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <Dialog open={open} aria-labelledby="dialog-depositjoin">
        <DialogTitle id="dialog-depositjoin">
          예금 상품 가입
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{label[index]}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length ? (
              <div>
                <div>가입이 완료되었습니다.</div>
                <div style={{ display: "block", float: "right" }}>
                  <Button onClick={handleClose}>닫기</Button>
                </div>
              </div>
            ) : (
              <div style={{ display: "block", alignContent: "center" }}>
                <div style={{ display: "block" }}>
                  {getStepContent(activeStep)}
                </div>
                <span style={{ color: "red" }}>{errmsg}</span>
                {activeStep === steps.length - 1 && (
                  <Button onClick={handleReset}>초기화</Button>
                )}
                <div style={{ display: "block", float: "right" }}>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    이전
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      onClick={onSubmit}
                      variant="contained"
                      color="primary"
                    >
                      제출
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      color="primary"
                    >
                      다음
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DepositAdd;
