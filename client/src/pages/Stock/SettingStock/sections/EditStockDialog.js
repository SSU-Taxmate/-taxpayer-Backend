import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions } from '@material-ui/core';
import { useSelector } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
function EditStockDialog({ stock }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date().now
        axios.post('/api/stocks',
            {
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <IconButton color="primary" onClick={handleOpen}><EditOutlinedIcon /></IconButton>
            <Dialog aria-labelledby="stock-dialog-title" open={open} onClose={handleClose} fullScreen >
                <div className='row'>
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <DialogTitle id="stock-dialog-title">주식 수정</DialogTitle>
                        <div className="dropdown no-arrow">
                               <IconButton ><EditOutlinedIcon /></IconButton>
                        </div>
                    </div>
                    <div className="card-body">

                        <div className="row py-2">
                            <div className="text-center font-weight-bold mx-2 job-label">주식이름</div>
                            <div className="seperator-gray mx-1"></div>
                            <div className="text-gray-900 text-center mx-2 job-input">{stock.stockName}</div>
                        </div>

                        <div className="row">

                            <div className="text-center font-weight-bold m-2 label job-label">설명</div>
                            <div className="seperator-gray m-1"></div>
                            <div className="text-gray-900 text-center m-2 job-input">{stock.description}</div>

                        </div>
                        <hr />
                        <div className="justify-content-center mb-4" >
                            <List dense >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
                                    const labelId = `checkbox-list-secondary-label-${value}`;
                                    return (
                                        <ListItem key={value} button>
                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    </div>
                </div>
                <DialogActions>
                    <button onClick={handleClose} color="primary" autoFocus>
                        닫기
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditStockDialog
