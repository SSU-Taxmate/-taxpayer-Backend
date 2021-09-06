import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { useState } from "react";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [payFine, setPayFine] = useState(props.data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitFine = (e) => {
    axios
      .put("/api/fine", payFine)
      .then(function (response) {
        if (response.data.success == false) {
          alert("잔액이 부족합니다!");
        } else {
          console.log(response);
          alert("벌금 납부가 완료되었습니다. ");
          window.location.reload();
        }
      })
      .catch(function (error) {
        alert("error");
        console.log(error);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        납부하기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"해당 벌금을 납부하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>
              납부해야할 금액은 총 {payFine.Amount} 미소 입니다.<br></br>
              납부하시겠습니까?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={submitFine} color="primary" autoFocus>
            납부
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
