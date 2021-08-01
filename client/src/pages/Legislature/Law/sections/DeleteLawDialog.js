import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Button } from '@material-ui/core';
import axios from 'axios';
function DeleteLawDialog(props) {
    const {data}=props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {

        axios.delete('/api/classes/:classId/laws', { params: { _id: data._id } })
        .then(function (response) {
          console.log(response);
        })
        // 응답(실패)
        .catch(function (error) {
          console.log(error);
        })
    };

    
    return (
        <>
            <div>        
            <button onClick={handleOpen} className='btn btn-outline-danger mb-3' >삭제</button>
            </div>
            <Dialog aria-labelledby="law-dialog-title" open={open}>
                <DialogTitle id="law-dialog-title">법 삭제</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>

                        <div>
                            정말 삭제하시겠습니까?
                            복구 불가능합니다.
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose} type="submit">네</Button>
                        <Button color="primary" onClick={handleClose}>아니요</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </>)
}

export default DeleteLawDialog
