import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import RemoveIcon from '@material-ui/icons/Remove';
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import axios from "axios";
function DeleteStockDialog({ stockId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('submit')
    axios
      .delete(`/api/stocks/${stockId}`)
      .then(function (response) {
        console.log(response);
      })
      // 응답(실패)
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <RemoveCircleOutlineIcon />
      </IconButton>
      <Dialog aria-labelledby="stock-dialog-title" open={open}>
        <DialogTitle id="stock-dialog-title">주식 삭제</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div>정말 삭제하시겠습니까? 복구 불가능합니다.</div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose} type="submit">
              네
            </Button>
            <Button color="primary" onClick={handleClose}>
              아니요
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default DeleteStockDialog;
