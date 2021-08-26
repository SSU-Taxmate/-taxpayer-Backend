import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DepositCloseModal({onhandleclick}) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>

            <button  className="p-2 btn btn-primary" onClick={handleClickOpen}>해지하기</button>

            <Dialog
                open={open}
                aria-labelledby="dialog-deposit-close"
            >
                <form onSubmit={onhandleclick}>
                    <DialogTitle id="dialog-deposit-close">
                        예금 상품 해지
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        정말 해지하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            아니요
                        </Button>
                        <Button type='submit'onClick={handleClose} color="primary" autoFocus>
                            네
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
