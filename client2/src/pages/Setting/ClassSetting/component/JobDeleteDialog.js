import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Delete from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

function JobDeleteDialog(props) {

    const [open, setOpen] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.rows.map((row) =>
        axios.delete(`/api/jobs/${row}`)
          .then((response) => {
            console.log(response);        
            handleClose();
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          })
      );
    };



    return (
        <div>
            <IconButton onClick={handleOpen} color='primary'><Delete/></IconButton>
            <Dialog aria-labelledby="depositAdd" open={open}>
                <DialogTitle id="depositAdd">job Delete dialog</DialogTitle>
                <DialogContent>
                    {props.rows.length}개의 직업을 삭제하시겠습니까?

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<Delete />}
                        onClick={handleSubmit}
                    >
                        삭제하기
                    </Button>
                    <Button color="primary" onClick={handleClose}>취소</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default JobDeleteDialog
