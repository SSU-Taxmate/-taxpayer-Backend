import React, { useState } from 'react';
import axios from 'axios';
import SendIcon from '@material-ui/icons/Send';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

function ApplyJob({ data }) {
    const [open, setOpen] = useState(false);
    const joinedUser = useSelector(state => state.classUser);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/students/${joinedUser.classUser}/jobs/${data._id}`)
            .then(function (response) {
                console.log(response);
                handleClose();
                //window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
        });
    };


    return (
        <div>
            <Button variant="contained"color="primary"startIcon={<SendIcon />}onClick={handleOpen}>
                        지원하기
            </Button>
            <Dialog aria-labelledby="depositAdd" open={open}>
                <DialogTitle id="depositAdd">지원하기</DialogTitle>
                <DialogContent>
                    {data.name}에 지원하겠습니까?
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                    >
                        지원하기
                    </Button>
                    <Button color="primary" onClick={handleClose}>취소</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default ApplyJob
